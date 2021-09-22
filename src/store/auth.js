
import Apios from '@/plugins/Apios'
import VueCookies from 'vue-cookies'
import smartStore from '@/plugins/smartStore'

const namespaced = true

const state = () => {
    return {
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
            mail: null,
            username: null
        }
    }
}

const getters = {

    level: state => {
        if (state.level === 'moderator') return 'moderator'
        else if (state.level === 'admin') return 'admin'
        else return 'user'
    },

    account: state => {
        if (!state.account) {
            state.authorized = false
            return null
        }
        return {
            mail: state.account.mail,
            username: state.account.username
        }
    },

    authorized: state => {
        return state.authorized
    },

    details: state => {
        if (state.token.access && state.token.refresh && state.authorized) return 'authorized'
        else if (state.token.access && state.token.refresh) return 'available'
        else if (state.token.refresh) return 'expired'
        else if (state.authorized) return 'unhooked'
        else return 'unauthorized'
    },

    premium: state => {
        if (!state.subscription || !state.subscription.id || state.subscription.deleted) return false
        if (state.subscription.status === 'active') return true
        if (state.subscription.status === 'non_renewing') return true
        if (state.subscription.status === 'in_trial') return true
        return false
    },

    subscription: state => {
        return state.subscription
    }

}

const mutations = {

    check: state => {
        state.token.access = VueCookies.get('accessToken') || false
        state.token.refresh = VueCookies.get('refreshToken') || false
    },

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
        state.level = dAccess.data.level
        state.authorized = true
    },

    remove: (state) => {
        VueCookies.remove('refreshToken')
        VueCookies.remove('accessToken')
        state.token.refresh = null
        state.token.access = null
        Apios.defaults.headers.common['Authorization'] = null
        state.authorized = false
        state.subscription = null
        state.account = null
        state.level = null
        smartStore.clearModules()
        smartStore.clearStorage()
    }

}

const actions = {

    loadInit (con) {
        Apios.get('app/').then(res => {
            con.commit('user/set', res.data.user, { root: true })
            con.commit('calories/set', res.data.calories, { root: true })
            con.commit('weight/syncSet', res.data.weight, { root: true })
            con.commit('activity/set', res.data.activity, { root: true })
        })
    },

    login (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/', form).then(res => {
                con.state.token.access = res.data.tokens.access
                con.state.token.refresh = res.data.tokens.refresh
                con.commit('place')

                con.dispatch('checkLogin').then(() => {
                    con.commit('user/set', res.data.user, { root: true })
                    con.commit('calories/set', res.data.calories, { root: true })
                    con.commit('weight/syncSet', res.data.weight, { root: true })
                    con.commit('activity/set', res.data.activity, { root: true })
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },

    refresh (con) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/refresh/', { token: con.state.token.refresh }).then(res => {
                con.state.token.access = res.data.tokens.access
                con.state.token.refresh = res.data.tokens.refresh
                con.commit('place')

                con.dispatch('checkLogin').then(() => {
                    con.commit('user/set', res.data.user, { root: true })
                    con.commit('calories/set', res.data.calories, { root: true })
                    con.commit('weight/syncSet', res.data.weight, { root: true })
                    con.commit('activity/set', res.data.activity, { root: true })
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                con.commit('remove')
                reject(err)
            })
        })
    },

    checkLogin (con) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/check/').then(res => {
                resolve()
            }).catch(err => {
                con.commit('user/remove', null, { root: true })
                con.commit('remove')
                resolve()
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
                con.commit('user/remove', null, { root: true })
                con.commit('remove')
            })
        })
    }

}

export default {
    namespaced: namespaced,
    getters,
    state,
    mutations,
    actions
}
