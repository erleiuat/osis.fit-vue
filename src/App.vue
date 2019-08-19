<template>
    <v-app>

        <Drawer />

        <router-view name="toolbar" />
        <Alerts />

        <!--
            -->
        <v-content>
            <transition appear name="fade" mode="out-in">
                <router-view />
            </transition>
        </v-content>

        <!--
                -->
        <!--
        -->

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
    },

    mounted () {
        this.$store.subscribe((mutation, state) => {
            this.$i18n.locale = this.$store.getters['locale']
            this.$vuetify.theme.dark = this.$store.getters['dark']
        })
    }

}
</script>
