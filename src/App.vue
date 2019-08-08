<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>

            <Alerts />

            <v-container fluid fill-height>
                <transition appear name="fade" mode="out-in">
                    <router-view />
                </transition>
            </v-container>

            <CookieInfo v-if="!$store.state.app.cookiesAccepted" />

        </v-content>

    </v-app>

</template>

<script>
import VueCookies from 'vue-cookies'
import Drawer from '@/components/nav/drawer/'
import Toolbar from '@/components/nav/Toolbar'

import(/* webpackPrefetch: true */ '@/assets/css/app.css')
import(/* webpackPrefetch: true */ '@/assets/css/transitions.css')

const Alerts = () => import('@/components/Alerts')
const CookieInfo = () => import('@/components/CookieInfo')

export default {
    name: 'App',

    components: {
        Toolbar, Drawer, Alerts, CookieInfo
    },

    beforeMount () {
        this.$store.state.app.lang = VueCookies.get('appLang') || navigator.language || navigator.userLanguage
        this.$i18n.locale = this.$store.state.app.lang
        this.$vuetify.theme.dark = VueCookies.get('themeDark')
        this.$store.state.app.drawer = this.$vuetify.breakpoint.lgAndUp
    },

    mounted () {
        if (!this.$cookies.get('cookieAcceptance')) this.$store.state.app.cookiesAccepted = false
    }

}
</script>
