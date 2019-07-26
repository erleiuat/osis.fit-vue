import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({

    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,

    messages: {
        en: {
            view: require('@/i18n/locales/views_en.json'),
            ft: require('@/i18n/locales/formTexts_en.json'),
            btn: require('@/i18n/locales/buttonTexts_en.json'),
            alert: require('@/i18n/locales/alerts_en.json'),
            $vuetify: require('@/i18n/locales/vuetify_en.json')
        },
        de: {
            view: require('@/i18n/locales/views_de.json'),
            ft: require('@/i18n/locales/formTexts_de.json'),
            btn: require('@/i18n/locales/buttonTexts_de.json'),
            alert: require('@/i18n/locales/alerts_de.json'),
            $vuetify: require('@/i18n/locales/vuetify_de.json')
        }
    }

})
