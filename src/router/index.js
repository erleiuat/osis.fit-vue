import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'
import i18n from '@/plugins/i18n/'

Vue.use(Router)

const main = require('@/router/routes/main')
const auth = require('@/router/routes/auth')
const app = require('@/router/routes/app')
const premium = require('@/router/routes/premium')

const router = new Router({
    mode: process.env.CORDOVA_PLATFORM ? null : 'history',
    //base: process.env.CORDOVA_PLATFORM ? null : process.env.VUE_APP_PUBLICPATH,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        ...main,
        ...auth,
        ...app,
        ...premium
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('auth/check')

    var auth = store.getters['auth/details']
    var start = (!!(to.name && to.name === 'start'))
    var needAuth = (to.name ? to.meta.authRequired : true)
    var needPremium = (to.name ? to.meta.premium : true)

    if (auth !== 'unauthorized') {
        if (auth === 'expired') {
            store.dispatch('refreshing', true)
            store.dispatch('auth/refresh').then(() => {
                if (!start) {
                    store.dispatch('loading', true)
                    next()
                } else router.push({ name: 'dashboard' })
            }).catch(res => {
                router.push({ name: 'start' })
            }).finally(() => {
                store.dispatch('refreshing', false)
            })
        } else if (auth === 'unhooked') {
            store.commit('auth/remove')
            router.push({ name: 'auth.login', query: { target: to.name } })
        } else {
            if (auth === 'available') {
                store.commit('auth/place')
                auth = store.getters['auth/details']
            }

            if (auth === 'authorized' && !start) {
                if (!needPremium || store.getters['auth/premium']) {
                    store.dispatch('loading', true)
                    next()
                } else if (from.name !== 'premium') router.push({ name: 'premium', query: { notify: true } })
            } else if (start) router.push({ name: 'dashboard' })
        }
    } else if (!needAuth) {
        if (!start) {
            store.dispatch('loading', true)
            next()
        } else router.push({ name: 'welcome' })
    } else {
        router.push({ name: 'auth.login', query: { target: to.name } })
    }
})

router.afterEach((to, from) => {
    store.dispatch('loading', false)
    if (to.name) document.title = i18n.t('view.' + to.name + '.title') + ' | ' + store.state.app.title
})

export default router
