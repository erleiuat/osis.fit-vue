import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'
import calories from './modules/calories'

export default new Vuex.Store({

    modules: {
        app,
        auth,
        user,
        calories
    },

    state: {
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

        loading (state, toggle) {
            if (toggle)
                state.app.timer = setTimeout(function () {
                    state.app.loading = true
                }, 500)
            else {
                clearTimeout(state.app.timer)
                state.app.loading = false
            }
        }

    }

})
