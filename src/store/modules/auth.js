import Apios from '@/plugins/Apios'
import VueCookies from 'vue-cookies'
import lStore from '@/plugins/lStore'
import router from '@/router/'

const state = {
    url: 'auth/',

    authorized: false,
    accessToken: null,
    refreshToken: null,
    premium: null,
    user: {
        id: null,
        mail: null,
        level: null
    }

}

const getters = {

    is: state => {
        return state.authorized
    },

    check: state => {
        if (state.authorized) return 'authorized'
        state.refreshToken = VueCookies.get('refreshToken')
        if (!state.refreshToken) return 'unauthorized'
        state.accessToken = VueCookies.get('accessToken')
        if (!state.accessToken) return 'expired'
        return 'available'
    },

    premium: state => {
        if (!state.premium) return true
        else if (state.premium.active) return true
        else return false
    },

    billing: state => {
        if (!state.premium) return {
            active: false,
            subscription: false,
            plan: false
        }
        else return state.premium
    }

}

const mutations = {

    place: (state) => {
        var tAccess = state.accessToken
        var tRefresh = state.refreshToken

        var dRefresh = JSON.parse(window.atob((tRefresh.split('.')[1]).replace('-', '+').replace('_', '/')))
        var dAccess = JSON.parse(window.atob((tAccess.split('.')[1]).replace('-', '+').replace('_', '/')))

        VueCookies.set('accessToken', tAccess, new Date(dAccess.exp * 1000))
        VueCookies.set('refreshToken', tRefresh, new Date(dRefresh.exp * 1000))

        Apios.defaults.headers.common['Authorization'] = 'Bearer ' + tAccess

        state.user = dAccess.data.user
        state.authorized = true

        state.premium = dAccess.data.premium

    },

    remove: (state) => {
        lStore.clear()
        VueCookies.remove('refreshToken')
        VueCookies.remove('accessToken')
        state.refreshToken = null
        state.accessToken = null
        Apios.defaults.headers.common['Authorization'] = null
        state.authorized = false
        state.user = null
    }

}

const actions = {

    /* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */

    check (con) {
        con.state.refreshToken = VueCookies.get('refreshToken')
        if (!con.state.refreshToken) con.commit('remove')
        else {
            con.state.accessToken = VueCookies.get('accessToken')
            if (!con.state.accessToken) con.dispatch('refresh')
        }
    },

    refresh (con) {
        return new Promise((resolve, reject) => {
            var data = { token: con.state.refreshToken }
            Apios.post(con.state.url + 'refresh/', data).then(res => {
                con.state.accessToken = res.data.tokens.access
                con.state.refreshToken = res.data.tokens.refresh
                con.commit('place')
                resolve()
            }).catch(err => {
                con.commit('remove')
                reject(err)
            })
        })
    },

    login (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url, form).then(res => {
                con.state.accessToken = res.data.tokens.access
                con.state.refreshToken = res.data.tokens.refresh
                con.commit('place')
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    logout (con) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'logout/', { token: con.state.refreshToken }).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            }).finally(() => {
                con.commit('remove')
            })
        })
    },

    register (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'register/', form).then(() => {
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

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
