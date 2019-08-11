import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/'

Vue.use(Router)

const main = require('@/router/routes/main')
const noAuth = require('@/router/routes/noAuth')
const app = require('@/router/routes/app')
const noPremium = require('@/router/routes/noPremium')

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...main,
        ...noAuth,
        ...app,
        ...noPremium
    ]
})

router.beforeEach((to, from, next) => {
    var start = (!!(to.name && to.name === 'start'))
    var needAuth = (to.name ? to.meta.authRequired : true)
    var needPremium = (to.name ? to.meta.premium : true)

    var auth = store.getters['auth/check']

    if (auth !== 'unauthorized')

        if (auth === 'expired') store.dispatch('auth/refresh').then(() => {
            router.push({ name: 'dashboard' })
        }).catch(res => {
            router.push({ name: 'start' })
        })

        else {
            if (auth === 'available') {
                store.commit('auth/place')
                auth = store.getters['auth/check']
            }
            if (auth === 'authorized')
                if (!start) {
                    if (!needPremium) next()
                    else if (store.getters['auth/premium']) next()
                    else router.push({ name: 'premium', query: { notify: true } })
                } else router.push({ name: 'dashboard' })
        }

    else if (!needAuth)
        if (!start) next()
        else router.push({ name: 'welcome' })
    else
        router.push({ name: 'auth', query: { target: to } })

    store.dispatch('auth/check')
})

router.beforeResolve((to, from, next) => {
    if (to.name) NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
