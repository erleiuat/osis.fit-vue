import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        today: null,
        cookiesAccepted: VueCookies.get('cAccept') || false,
        viewport: {
            mobile: false,
            tablet: false,
            desktop: false
        },
        app: {
            drawer: null,
            toolbar2: VueCookies.get('appToolbar2') || false,
            title: process.env.VUE_APP_NAME,
            dark: VueCookies.get('appDark') || false,
            language: VueCookies.get('appLang') || navigator.language || navigator.userLanguage
        },
        auth: {
            authorized: false,
            level: null
        },
        token: {
            access: null,
            refresh: null
        },
        subscription: {
            id: null,
            status: null,
            deleted: null,
            expiration: null,
            plan: null
        },
        account: {
            id: null,
            mail: null
        }

    },

    getters: {

        device: state => {
            return state.viewport
        },

        auth: state => {
            return state.auth.authorized
        },

        authDetail: state => {
            if (state.auth.authorized) return 'authorized'
            state.token.refresh = VueCookies.get('refreshToken')
            if (!state.token.refresh) return 'unauthorized'
            state.token.access = VueCookies.get('accessToken')
            if (!state.token.access) return 'expired'
            return 'available'
        },

        premium: state => {
            if (!state.subscription) return false
            if (!state.subscription.id) return false
            if (state.subscription.deleted) return false
            if (state.subscription.status === 'active') return true
            if (state.subscription.status === 'non_renewing') return true
            if (state.subscription.status === 'in_trial') return true
            return false
        },

        cookieNotice: state => {
            return !state.cookiesAccepted
        },

        sub: state => {
            return state.subscription
        },

        locale: state => {
            return state.app.language
        },

        toolbar2: state => {
            if (state.app.toolbar2) return true
            return false
        },

        dark: state => {
            if (state.app.dark) return true
            return false
        },

        today: state => {
            if (!state.today) {
                var now = new Date()
                state.today = (new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString())
            }
            return {
                date: state.today.substr(0, 10),
                time: state.today.substr(11, 5)
            }
        }

    },

    mutations: {

        setViewport: (state, info) => {
            state.viewport.mobile = (info === 'mobile' ? true : false)
            state.viewport.tablet = (info === 'tablet' ? true : false)
            state.viewport.desktop = (info === 'desktop' ? true : false)
        },

        setLocale: (state, info) => {
            state.app.language = info
            VueCookies.set('appLang', info)
        },

        setDark: (state, info) => {
            state.app.dark = info
            if (info) VueCookies.set('appDark', 1, -1)
            else VueCookies.remove('appDark')
        },

        setToolbar2: (state, info) => {
            state.app.toolbar2 = info
            if (info) VueCookies.set('appToolbar2', 1, -1)
            else VueCookies.remove('appToolbar2')
        },

        setDrawer: (state, condition) => {
            state.app.drawer = condition
        },

        acceptCookies: state => {
            state.cookiesAccepted = true
            VueCookies.set('cAccept', true, -1)
        },

        setTokens: (state, tokens) => {
            state.token.access = tokens.access
            state.token.refresh = tokens.refresh
        },

        placeAuth: (state) => {
            var tAccess = state.token.access
            var tRefresh = state.token.refresh

            var dRefresh = JSON.parse(window.atob((tRefresh.split('.')[1]).replace('-', '+').replace('_', '/')))
            var dAccess = JSON.parse(window.atob((tAccess.split('.')[1]).replace('-', '+').replace('_', '/')))

            VueCookies.set('accessToken', tAccess, new Date(dAccess.exp * 1000))
            VueCookies.set('refreshToken', tRefresh, new Date(dRefresh.exp * 1000))

            Apios.defaults.headers.common['Authorization'] = 'Bearer ' + tAccess

            state.account = dAccess.data.account
            state.subscription = dAccess.data.subscription
            state.auth.authorized = true
        },

        removeAuth: (state) => {
            VueCookies.remove('refreshToken')
            VueCookies.remove('accessToken')
            state.token.refresh = null
            state.token.access = null
            Apios.defaults.headers.common['Authorization'] = null
            state.auth.authorized = false
            state.subscription = null
            state.account = null
            smartStore.clearModules()
            smartStore.clearStorage()
        }

    },

    actions: {

        drawer (con) {
            con.commit('setDrawer', !con.state.app.drawer)
        },

        checkAuth (con) {
            con.state.token.refresh = VueCookies.get('refreshToken')
            if (!con.state.token.refresh) con.commit('removeAuth')
            else {
                con.state.token.access = VueCookies.get('accessToken')
                if (!con.state.token.access) con.dispatch('refreshAuth')
            }
        },

        refreshAuth (con) {
            return new Promise((resolve, reject) => {
                var data = { token: con.state.token.refresh }
                Apios.post('auth/refresh/', data).then(res => {
                    con.commit('setTokens', res.data.tokens)
                    con.commit('placeAuth')
                    resolve()
                }).catch(err => {
                    con.commit('removeAuth')
                    reject(err)
                })
            })
        },

        auth (con, form) {
            return new Promise((resolve, reject) => {
                Apios.post('auth/', form).then(res => {
                    con.commit('setTokens', res.data.tokens)
                    con.commit('placeAuth')
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        logout (con) {
            return new Promise((resolve, reject) => {
                Apios.post('auth/logout/', { token: con.state.token.refresh }).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    con.commit('removeAuth')
                })
            })
        },

        register (con, form) {
            return new Promise((resolve, reject) => {
                Apios.post('auth/register/', form).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        verify (con, form) {
            return new Promise((resolve, reject) => {
                Apios.post('auth/verify/', form).then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        forgot (con) {
            return new Promise((resolve, reject) => {
                Apios.post('auth/password/forgotten/').then(() => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }

})
