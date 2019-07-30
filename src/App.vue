<template>
    <v-app>

        <Drawer />
        <Toolbar />

        <v-content>

            <Alerts />

            <transition appear name="fade" mode="out-in">
                <router-view>
                </router-view>
            </transition>

            <CookieInfo v-if="!$store.state.app.cookiesAccepted" />

        </v-content>

    </v-app>

</template>

<script>
import Drawer from '@/components/nav/Drawer'
import Toolbar from '@/components/nav/Toolbar'
import Alerts from '@/components/Alerts'
import VueCookies from 'vue-cookies'

import(/* webpackPrefetch: true */ '@/assets/css/app.css')
import(/* webpackPrefetch: true */ '@/assets/css/transitions.css')

const CookieInfo = () => import('@/components/CookieInfo')

export default {
    name: 'App',

    components: {
        Toolbar, Drawer, Alerts, CookieInfo
    },

    beforeMount () {
        this.$i18n.locale = VueCookies.get('appLang') || navigator.language || navigator.userLanguage
        this.$vuetify.theme.dark = VueCookies.get('themeDark')
        this.$store.state.app.drawer = this.$vuetify.breakpoint.lgAndUp

        if (this.$route.name === 'start') this.$store.dispatch('auth/check').then(r => {
            this.$router.push({ name: 'dashboard' })
        }).catch(r => {
            this.$router.push({ name: 'welcome' })
        })

        this.$router.beforeResolve((to, from, next) => {
            if (!to.meta.authRequired) next()
            else if (this.$store.getters['auth/status']) next()
            else this.$router.push({ name: 'auth', query: { target: to.name } })
        })
    },

    mounted () {
        if (!this.$cookies.get('cookie_acceptance')) this.$store.state.app.cookiesAccepted = false
    }

}
</script>
