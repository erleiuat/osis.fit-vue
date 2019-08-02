import Vue from 'vue'
import i18n from '@/plugins/i18n'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params)
    },
    theme: {
        themes: {
            light: {
                primary: '45B0FF',
                secondary: '23355E',
                accent: '7D93A5',
                error: 'f44336',
                success: '48b082',
                warning: 'c5a04a',
                info: '23355e'
            },
            dark: {
                primary: '45B0FF',
                secondary: '23355E',
                accent: '7D93A5',
                error: 'f44336',
                success: '48b082',
                warning: 'c5a04a',
                info: '375293'
            }
        },
        options: {
            customProperties: true,
        }
    },
    icons: {
        iconfont: 'md'
    }
})
