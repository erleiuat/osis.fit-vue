import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/'
import i18n from '@/plugins/i18n/'

Vue.use(Router)

const main = require('@/router/routes/main')
const auth = require('@/router/routes/auth')
const app = require('@/router/routes/app')
const premium = require('@/router/routes/premium')

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...main,
        ...auth,
        ...app,
        ...premium
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('auth/check')

    var start = (!!(to.name && to.name === 'start'))
    var needAuth = (to.name ? to.meta.authRequired : true)
    var needPremium = (to.name ? to.meta.premium : true)

    var auth = store.getters['auth/details']

    if (auth !== 'unauthorized')

        if (auth === 'expired') store.dispatch('auth/refresh').then(() => {
            if (!start) {
                NProgress.start()
                next()
            } else router.push({ name: 'dashboard' })
        }).catch(res => {
            router.push({ name: 'start' })
        })

        else if (auth === 'unhooked') {
            store.commit('auth/remove')
            router.push({ name: 'auth.login', query: { target: to.name } })
        } else {
            if (auth === 'available') {
                store.commit('auth/place')
                auth = store.getters['auth/details']
            }

            if (auth === 'authorized' && !start)
                if (!needPremium) {
                    NProgress.start()
                    next()
                } else if (store.getters['auth/premium']) {
                    NProgress.start()
                    next()
                } else router.push({ name: 'premium', query: { notify: true } })
            else if (start)
                router.push({ name: 'dashboard' })
        }

    else if (!needAuth)
        if (!start) {
            NProgress.start()
            next()
        } else router.push({ name: 'welcome' })
    else
        router.push({ name: 'auth.login', query: { target: to.name } })
})

router.afterEach((to, from) => {
    NProgress.done()
    if (to.name) document.title = i18n.t('view.' + to.name + '.title') + ' | ' + store.state.app.title
})

export default router
