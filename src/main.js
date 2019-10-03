import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store/'
import router from '@/router/'

import '@/plugins/pwa/'
import i18n from '@/plugins/i18n/'
import vuetify from '@/plugins/vuetify/'
import smartStore from '@/plugins/smartStore'
import vcontainer from '@/plugins/vuetify/vcontainer'
import Notifications from 'vue-notification'

import(/* webpackPrefetch: true */ '@/assets/css/app.css')
import(/* webpackPrefetch: true */ '@/assets/css/transitions.css')

Vue.component('vcontainer', vcontainer)
Vue.use(Notifications)
Vue.use(smartStore, { store: store })

Vue.config.productionTip = false
Vue.prototype.$dateFormat = (date) => {
    if (!date) return null
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
}

Vue.prototype.$getByLang = (lang, string) => {
    if (!string) return
    lang = lang.toUpperCase()
    if (string.includes('[' + lang + ']')) {
        return string.substring(
            string.lastIndexOf('[' + lang + ']') + 4,
            string.lastIndexOf('[/' + lang + ']')
        )
    } else if (string.includes('[EN]')) {
        return string.substring(
            string.lastIndexOf('[EN]') + 4,
            string.lastIndexOf('[/EN]')
        )
    } else {
        return string
    }
}

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
