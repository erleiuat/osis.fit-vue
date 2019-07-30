import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({

    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,

    messages: {
        en: {
            view: require('@/plugins/locales/views_en.json'),
            ft: require('@/plugins/locales/formTexts_en.json'),
            btn: require('@/plugins/locales/buttonTexts_en.json'),
            alert: require('@/plugins/locales/alerts_en.json'),
            $vuetify: require('@/plugins/locales/vuetify_en.json')
        },
        de: {
            view: require('@/plugins/locales/views_de.json'),
            ft: require('@/plugins/locales/formTexts_de.json'),
            btn: require('@/plugins/locales/buttonTexts_de.json'),
            alert: require('@/plugins/locales/alerts_de.json'),
            $vuetify: require('@/plugins/locales/vuetify_de.json')
        }
    }

})
