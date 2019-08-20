<template>
    <v-app>

        <Drawer v-if="$store.getters['auth']"/>

        <router-view name="toolbar" />
        <Alerts />

        <v-content>
            <transition appear name="fade" mode="out-in">
                <router-view />
            </transition>
        </v-content>

        <transition appear name="slideUp" mode="out-in">
            <router-view name="bottom" />
        </transition>

        <CookieInfo v-if="this.$store.getters['cookieNotice']" />

    </v-app>
</template>

<script>
import Drawer from '@/components/nav/drawer/'

const Alerts = () => import('@/components/Alerts')
const CookieInfo = () => import('@/components/CookieInfo')

export default {
    name: 'App',

    components: {
        Drawer, Alerts, CookieInfo
    },

    created () {
        this.$i18n.locale = this.$store.getters['locale']
        this.$vuetify.theme.dark = this.$store.getters['dark']
        var metaThemeColor = document.querySelector('meta[name=theme-color]')
        if (this.$vuetify.theme.dark) metaThemeColor.setAttribute('content', '#303030')
        else metaThemeColor.setAttribute('content', '#FAFAFA')
    },

    mounted () {
        this.$store.subscribe((mutation, state) => {
            this.$i18n.locale = this.$store.getters['locale']
            this.$vuetify.theme.dark = this.$store.getters['dark']
        })
    }

}
</script>
