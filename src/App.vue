<template>
    <v-app :dark="$store.state.app.dark">

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

import(/* webpackPrefetch: true */ '@/assets/css/app.css')
import(/* webpackPrefetch: true */ '@/assets/css/transitions.css')

const CookieInfo = () => import('@/components/CookieInfo')

export default {
    name: 'App',

    metaInfo () {
        return {
            title: (this.$route.name ? this.$t('view.' + this.$route.name + '.title') : ''),
            titleTemplate: (this.$route.name ? '%s | Osis.fit' : 'Osis.fit'),
            htmlAttrs: { lang: this.$store.state.app.language }
        }
    },

    components: {
        Toolbar, Drawer, Alerts, CookieInfo
    },

    beforeMount () {
        var vm = this

        vm.$store.state.app.drawer = vm.$vuetify.breakpoint.lgAndUp
        if (vm.$cookies.get('client_darkmode') === 'true') vm.$store.state.app.dark = true
        if (vm.$cookies.get('client_language')) vm.$store.state.app.language = vm.$cookies.get('client_language')

        if (vm.$route.name === 'start')
            if (vm.$store.state.auth.login || vm.$cookies.get('app_token')) {
                vm.$router.push({ name: 'dashboard' })
            } else {
                vm.$router.push({ name: 'welcome' })
            }

        vm.$router.beforeEach((to, from, next) => {
            vm.$store.state.app.routing = true
            next()
        })

        vm.$router.beforeResolve((to, from, next) => {
            if (!to.meta.authRequired) next()
            else if (vm.$store.state.auth.login) next()
            else vm.$router.push({ name: 'auth', query: { target: to } })
        })

        vm.$router.afterEach((to, from) => {
            vm.$store.state.app.routing = false
        })

        vm.$i18n.locale = vm.$store.state.app.language
        vm.$store.watch(state => {
            return vm.$store.state.app.language
        }, (newValue, oldValue) => {
            vm.$i18n.locale = vm.$store.state.app.language
        })
    },

    mounted () {
        if (!this.$cookies.get('cookie_acceptance')) this.$store.state.app.cookiesAccepted = false
    }

}
</script>
