import Apios from '@/plugins/Apios'
import VueCookies from 'vue-cookies'
import lStore from '@/plugins/lStore'
import router from '@/router/'

const state = {
    url: 'auth/',

    authorized: false,
    level: null,
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

}

const getters = {

    is: state => {
        return state.authorized
    },

    check: state => {
        if (state.authorized) return 'authorized'
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
        return false
    },

    subscription: state => {
        return state.subscription
    }

}

const mutations = {

    place: (state) => {

        var tAccess = state.token.access
        var tRefresh = state.token.refresh

        var dRefresh = JSON.parse(window.atob((tRefresh.split('.')[1]).replace('-', '+').replace('_', '/')))
        var dAccess = JSON.parse(window.atob((tAccess.split('.')[1]).replace('-', '+').replace('_', '/')))

        VueCookies.set('accessToken', tAccess, new Date(dAccess.exp * 1000))
        VueCookies.set('refreshToken', tRefresh, new Date(dRefresh.exp * 1000))

        Apios.defaults.headers.common['Authorization'] = 'Bearer ' + tAccess

        state.account = dAccess.data.account
        state.subscription = dAccess.data.subscription
        state.authorized = true

    },

    remove: (state) => {
        lStore.clear()
        VueCookies.remove('refreshToken')
        VueCookies.remove('accessToken')
        state.token.refresh = null
        state.token.access = null
        Apios.defaults.headers.common['Authorization'] = null
        state.authorized = false
        state.subscription = null
        state.account = null
    }

}

const actions = {

    /* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */

    check (con) {
        con.state.token.refresh = VueCookies.get('refreshToken')
        if (!con.state.token.refresh) con.commit('remove')
        else {
            con.state.token.access = VueCookies.get('accessToken')
            if (!con.state.token.access) con.dispatch('refresh')
        }
    },

    refresh (con) {
        return new Promise((resolve, reject) => {
            var data = { token: con.state.token.refresh }
            Apios.post(con.state.url + 'refresh/', data).then(res => {
                con.state.token.access = res.data.tokens.access
                con.state.token.refresh = res.data.tokens.refresh
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
                con.state.token.access = res.data.tokens.access
                con.state.token.refresh = res.data.tokens.refresh
                con.commit('place')
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    logout (con) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'logout/', { token: con.state.token.refresh }).then(() => {
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
