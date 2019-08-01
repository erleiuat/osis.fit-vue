import Vue from 'vue'
import i18n from '@/plugins/i18n'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
    theme: {
        themes: {
            /*
            light: {
                primary: '#ee44aa',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            }
            */
        }
    },
    icons: {
        iconfont: 'md'
    }
})
