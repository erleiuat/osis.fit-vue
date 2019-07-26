import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        app: {
            title: 'Osis.fit',
            version: '1.0',
            drawer: false,
            language: navigator.language || navigator.userLanguage,
            dark: false,
            loading: false,
            routing: false,
            cookiesAccepted: true,
            timer: null
        },

        auth: {
            login: false,
            token: null,
            user: {
                id: null,
                mail: null,
                type: null
            }
        },

        user: {
            firstname: null,
            lastname: null,
            birthdate: null,
            height: null,
            gender: null,
            aims: {
                weight: null,
                date: null
            }
        },

        data: {
            calorie_log: [],
            weight_log: [],
            activity_log: [],
            food: [],
            foodFavorite: []
        }

    },

    getters: {

        sortedWeights: state => {
            var arr = state.data.weight_log
            arr.sort(function (a, b) {
                return (
                    new Date(a.date + 'T' + a.time) -
                    new Date(b.date + 'T' + b.time)
                )
            })
            return arr
        },

        latestWeight: state => {
            var a = state.data.weight_log
            var mostRecentDate = new Date(Math.max.apply(null, a.map(e => {
                return new Date(e.date + 'T' + e.time)
            })))
            return a.filter(e => {
                var d = new Date(e.date + 'T' + e.time)
                return d.getTime() === mostRecentDate.getTime()
            })[0]
        },

        totalCalories: state => {
            var result = 0
            state.data.calorie_log.forEach(function (elem) {
                result += elem.calories
            })
            return result
        },

        totalActivity: state => {
            var result = 0
            state.data.activity_log.forEach(function (elem) {
                result += elem.calories
            })
            return result
        }

    },

    mutations: {

        drawer (state, val) {
            state.app.drawer = val
        },

        loading (state, toggle) {
            if (toggle)
                state.app.timer = setTimeout(function () {
                    state.app.loading = true
                }, 500)
            else {
                clearTimeout(state.app.timer)
                state.app.loading = false
            }
        },

        login (state, token) {
            var now = Math.floor(Date.now() / 1000)
            var dec = JSON.parse(window.atob((token.split('.')[1]).replace('-', '+').replace('_', '/')))

            if (now > dec.exp) {
                state.auth.login = false
                state.auth.token = null
                state.auth.user = {}
            } else {
                state.auth.token = token
                state.auth.login = true
                state.auth.user = dec.data.user
            }
        },

        logout (state) {
            state.auth.login = false
            state.auth.token = null
            state.auth.user = {}
        }

    },

    actions: {

    }

})
