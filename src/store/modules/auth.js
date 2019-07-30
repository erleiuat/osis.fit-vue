import Apios from '@/store/Apios'
import VueCookies from 'vue-cookies'

const state = {

    status: false,
    accessToken: null,
    refreshToken: null,
    user: {
        id: null,
        mail: null,
        level: null
    }

}

const getters = {
    status: state => {
        return state.status
    }
}

const mutations = {

    placeAuth: (state, tokens) => {

        var dec1 = JSON.parse(window.atob((tokens.access.split('.')[1]).replace('-', '+').replace('_', '/')))
        var dec2 = JSON.parse(window.atob((tokens.refresh.split('.')[1]).replace('-', '+').replace('_', '/')))

        VueCookies.set('accessToken', tokens.access, new Date(dec1.exp * 1000));
        VueCookies.set('refreshToken', tokens.refresh, new Date(dec2.exp * 1000));
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

    check (context) {
        return new Promise((resolve, reject) => {

            var tRefresh = VueCookies.get('refreshToken')
            
            if (!tRefresh) reject()
            else {

                var tAccess = VueCookies.get('accessToken')
                if (tAccess) {
                    context.commit('placeAuth', {access: tAccess, refresh: tRefresh })
                    resolve()
                } else {
                    context.dispatch('refresh', tRefresh).then(r => {
                        resolve()
                    }).catch(r => {
                        context.dispatch('logout')
                        reject()
                    })
                }

            }

        })
    },

    refresh (context, token) { 
        return new Promise((resolve, reject) => {
            Apios.post('auth/refresh/', { token: token }).then(r => {
                context.commit('placeAuth',  r.data.data.tokens)
                resolve()
            }, error => {
                reject(error.response.data.condition)
            })
        })
    },

    login (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/', form).then(r => {
                context.commit('placeAuth', r.data.data.tokens)
                resolve()
            }, error => {
                reject(error.response.data.condition)
            })
        })
    },

    logout (context) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/logout/', { token: context.state.refreshToken }).finally(() => {
                context.commit('removeAuth')
                resolve()
            })
        })
    },

    register (context, data) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/register/', data).then(r => {
                resolve()
            }, error => {
                reject(error.response.data.condition)
            })
        })
    },

    verify (context, data) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/verify/', data).then(r => {
                resolve()
            }, error => {
                reject(error.response.data.condition)
            })
        })
    },

}

export default {
    namespaced: true,
    state, getters, mutations, actions
}
