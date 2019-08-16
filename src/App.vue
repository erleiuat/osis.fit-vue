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

            <CookieInfo v-if="this.$store.getters['cookieNotice']"/>

        </v-content>

    </v-app>

</template>

<script>
import Drawer from '@/components/nav/drawer/'
import Toolbar from '@/components/nav/Toolbar'

const Alerts = () => import('@/components/Alerts')
const CookieInfo = () => import('@/components/CookieInfo')

export default {
    name: 'App',

    components: {
        Toolbar, Drawer, Alerts, CookieInfo
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
