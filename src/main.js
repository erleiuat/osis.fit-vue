import '@babel/polyfill'
import '@/registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify'

import Notifications from 'vue-notification'
Vue.use(Notifications)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: function (h) { return h(App) }
}).$mount('#app')
