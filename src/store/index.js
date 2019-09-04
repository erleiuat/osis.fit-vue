import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

import user from '@/store/user'
import auth from '@/store/auth'

import calories from '@/store/calories'
import activity from '@/store/activity'
import weight from '@/store/weight'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        user, auth, calories, activity, weight
    },

    state: {
        today: null,
        cookiesAccepted: VueCookies.get('cAccept') || false,
        app: {
            drawer: null,
            title: process.env.VUE_APP_NAME,
            dark: VueCookies.get('appDark') || false,
            toolbar2: VueCookies.get('appToolbar2') || false,
            language: VueCookies.get('appLang') || navigator.language || navigator.userLanguage
        }
    },

    getters: {

        cookieNotice: state => {
            return !state.cookiesAccepted
        },

        app: state => {
            return {
                locale: state.app.language,
                dark: state.app.dark
            }
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

        setLocale: (state, info) => {
            state.app.language = info
            VueCookies.set('appLang', info)
        },

        setDark: (state, info) => {
            state.app.dark = info
            var metaThemeColor = document.querySelector('meta[name=theme-color]')
            if (info) {
                VueCookies.set('appDark', 1, -1)
                metaThemeColor.setAttribute('content', '#303030')
            } else {
                VueCookies.remove('appDark')
                metaThemeColor.setAttribute('content', '#FAFAFA')
            }
        },

        setDrawer: (state, condition) => {
            state.app.drawer = condition
        },

        acceptCookies: state => {
            state.cookiesAccepted = true
            VueCookies.set('cAccept', true, -1)
        }

    },

    actions: {

        drawer (con) {
            con.commit('setDrawer', !con.state.app.drawer)
        }

    }

})
