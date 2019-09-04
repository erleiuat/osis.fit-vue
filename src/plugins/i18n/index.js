import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export default new VueI18n({

    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,

    messages: {
        en: {
            view: require('@/plugins/i18n/translations/views_en.json'),
            pnt: require('@/plugins/i18n/translations/partsAndTypes_en.json'),
            ft: require('@/plugins/i18n/translations/formTexts_en.json'),
            btn: require('@/plugins/i18n/translations/buttonTexts_en.json'),
            alert: require('@/plugins/i18n/translations/alerts_en.json'),
            $vuetify: require('@/plugins/i18n/translations/vuetify_en.json')
        },
        de: {
            view: require('@/plugins/i18n/translations/views_de.json'),
            pnt: require('@/plugins/i18n/translations/partsAndTypes_de.json'),
            ft: require('@/plugins/i18n/translations/formTexts_de.json'),
            btn: require('@/plugins/i18n/translations/buttonTexts_de.json'),
            alert: require('@/plugins/i18n/translations/alerts_de.json'),
            $vuetify: require('@/plugins/i18n/translations/vuetify_de.json')
        }
    }

})
