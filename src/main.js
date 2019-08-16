import '@babel/polyfill'
import '@/registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import smartStore from './plugins/smartStore'
import router from './router/'
import store from './store/'
import i18n from './plugins/i18n/'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'

import VueCookies from 'vue-cookies'

import(/* webpackPrefetch: true */ '@/assets/css/app.css')
import(/* webpackPrefetch: true */ '@/assets/css/transitions.css')
Vue.use(Notifications)
Vue.use(VueCookies)

Vue.use(smartStore, {
    store: store
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: function (h) { return h(App) }
}).$mount('#app')
