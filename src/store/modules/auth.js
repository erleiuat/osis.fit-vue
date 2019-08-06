import Apios from '@/store/Apios'
import VueCookies from 'vue-cookies'

const state = {

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
    check (context) {
        return new Promise((resolve, reject) => {
            var tRefresh = VueCookies.get('refreshToken')
            if (!tRefresh) reject()
            else {
                var tAccess = VueCookies.get('accessToken')
                if (tAccess) {
                    context.commit('placeAuth', { access: tAccess, refresh: tRefresh })
                    resolve()
                } else context.dispatch('refresh', tRefresh).then(r => {
                    resolve()
                }).catch(err => {
                    context.dispatch('logout')
                    reject(err)
                })
            }
        })
    },

    refresh (context, token) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/refresh/', { token: token }).then(res => {
                context.commit('placeAuth', res.data.tokens)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    login (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/', form).then(res => {
                context.commit('placeAuth', res.data.tokens)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    logout (context) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/logout/', { token: context.state.refreshToken }).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            }).finally(() => {
                context.commit('removeAuth')
            })
        })
    },

    register (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/register/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    verify (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/verify/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    forgot (context) {
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
