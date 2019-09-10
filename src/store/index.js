import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import NProgress from '@/plugins/nprogress'

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
        loading: 0,
        updating: false,
        authRefresh: false,
        hasLoaded: (VueCookies.get('hasLoaded') ? true : false),
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

        updating: state => {
            return state.updating
        },

        refreshing: state => {
            return state.authRefresh
        },

        loading: state => {
            if (state.loading > 0) return true
            else return false
        },

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

        setUpdating: (state, val) => {
            if (val) {
                if (!state.hasLoaded) VueCookies.set('hasLoaded', true, -1)
                else state.updating = val
            } else state.updating = false
        },

        setRefreshing: (state, val) => {
            if (val) state.authRefresh = true
            else state.authRefresh = false
        },

        setLoading: (state, val) => {
            if (val === true) state.loading++
            else if (val === false) state.loading--
            if (state.loading === 1) NProgress.start()
            else if (state.loading === 0) NProgress.done()
        },

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

        updating (con, val) {
            con.commit('setUpdating', val)
        },

        refreshing (con, val) {
            con.commit('setRefreshing', val)
        },

        loading (con, val) {
            con.commit('setLoading', val)
        },

        drawer (con) {
            con.commit('setDrawer', !con.state.app.drawer)
        }

    }

})
