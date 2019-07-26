import '@babel/polyfill'
import '@/registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import VueCookies from 'vue-cookies'
import router from './router/'
import store from './store'
import axios from 'axios'
import i18n from './i18n/'

Vue.use(Notifications)
Vue.use(VueCookies)
Vue.use(Vuetify, {
    lang: {
        t: (key, ...params) => i18n.t(key, params)
    },
    theme: {
        primary: '2DC7FF',
        secondary: '444545',
        accent: '191716',
        error: 'EB0000',
        success: '22BB33',
        warning: 'FB8C00',
        info: '2196F3'
    }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    baseURL: process.env.VUE_APP_API_URL + 'main/',
    withCredentials: true
})

new Vue({
    router,
    store,
    i18n,
    render: function (h) { return h(App) }
}).$mount('#app')
