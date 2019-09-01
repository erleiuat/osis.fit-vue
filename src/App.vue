<template>
    <v-app>

        <Drawer v-if="$store.getters['auth/authorized']" />

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

    methods: {
        setMetaTheme (dark) {
            var metaThemeColor = document.querySelector('meta[name=theme-color]')
            if (dark) metaThemeColor.setAttribute('content', '#303030')
            else metaThemeColor.setAttribute('content', '#FAFAFA')
        }
    },

    created () {
        var appInfo = this.$store.getters['app']
        this.$i18n.locale = appInfo.locale
        this.$vuetify.theme.dark = appInfo.dark
        this.setMetaTheme(appInfo.dark)

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setLocale') this.$i18n.locale = mutation.payload
            else if (mutation.type === 'setDark') {
                this.$vuetify.theme.dark = mutation.payload
                this.setMetaTheme(mutation.payload)
            }
        })
    }
}
</script>
