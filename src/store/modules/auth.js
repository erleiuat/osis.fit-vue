import Apios from '@/plugins/Apios'
import VueCookies from 'vue-cookies'
import lStore from '@/plugins/lStore'

const state = {
    url: 'auth/',
    status: false,
    accessToken: null,
    refreshToken: null,
    user: {
        id: null,
        mail: null,
        level: null,
        premium: null
    }

}

const getters = {
    status: state => {
        return state.status
    },
    premium: state => {
        if (!state.user) return false
        if (typeof state.user.premium !== 'boolean') return false
        if (state.user.premium === true) return true
        return false
    }
}

const mutations = {

    placeAuth: (state, tokens) => {
        var dec1 = JSON.parse(window.atob((tokens.access.split('.')[1]).replace('-', '+').replace('_', '/')))
        var dec2 = JSON.parse(window.atob((tokens.refresh.split('.')[1]).replace('-', '+').replace('_', '/')))

        VueCookies.set('accessToken', tokens.access, new Date(dec1.exp * 1000))
        VueCookies.set('refreshToken', tokens.refresh, new Date(dec2.exp * 1000))
        Apios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens.access

        state.accessToken = tokens.access
        state.refreshToken = tokens.refresh
        state.user = dec1.data.user
        state.status = true
    },

    removeAuth: (state) => {
        lStore.clear()
        VueCookies.remove('accessToken')
        VueCookies.remove('refreshToken')
        Apios.defaults.headers.common['Authorization'] = null
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.status = false
    }

}

const actions = {

    /* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
    check (con) {
        return new Promise((resolve, reject) => {
            var tRefresh = VueCookies.get('refreshToken')
            if (!tRefresh) reject()
            else {
                var tAccess = VueCookies.get('accessToken')
                if (tAccess) {
                    con.commit('placeAuth', { access: tAccess, refresh: tRefresh })
                    resolve()
                } else con.dispatch('refresh', tRefresh).then(r => {
                    resolve()
                }).catch(err => {
                    con.dispatch('logout')
                    reject(err)
                })
            }
        })
    },

    refresh (con, token) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'refresh/', { token: token }).then(res => {
                con.commit('placeAuth', res.data.tokens)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    login (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url, form).then(res => {
                con.commit('placeAuth', res.data.tokens)
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
                con.commit('removeAuth')
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
