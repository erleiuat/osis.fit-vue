import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'
import i18n from '@/plugins/i18n/'

import main from '@/router/routes/main'
import auth from '@/router/routes/auth'
import app from '@/router/routes/app'
import premium from '@/router/routes/premium'

Vue.use(Router)

const router = new Router({
    mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
    base: process.env.BASE_URL,
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
                } else next({ name: 'dashboard' })
            }).catch(res => {
                next({ name: 'start' })
            }).finally(() => {
                store.dispatch('refreshing', false)
            })
        } else if (auth === 'unhooked') {
            store.commit('auth/remove')
            next({ name: 'auth.login', query: { target: to.name } })
        } else {
            if (auth === 'available') {
                store.commit('auth/place')
                auth = store.getters['auth/details']
            }

            if (auth === 'authorized' && !start) {
                if (!needPremium || store.getters['auth/premium']) {
                    store.dispatch('loading', true)
                    next()
                } else if (from.name !== 'premium') next({ name: 'premium', query: { notify: true } })
            } else if (start) next({ name: 'dashboard' })
        }
    } else if (!needAuth) {
        if (!start) {
            store.dispatch('loading', true)
            next()
        } else next({ name: 'welcome' })
    } else {
        next({ name: 'auth.login', query: { target: to.name } })
    }
})

router.afterEach((to, from) => {
    store.dispatch('loading', false)
    if (to.name) document.title = i18n.t('view.' + to.name + '.title') + ' | ' + store.state.app.title
})

export default router
