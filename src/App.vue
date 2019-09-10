<template>
    <v-app>

        <Drawer v-if="$store.getters['auth/authorized']" />

        <router-view name="toolbar" />

        <v-content>
            <transition appear name="fade" mode="out-in">
                <router-view />
            </transition>
        </v-content>

        <transition appear name="slideUp" mode="out-in">
            <router-view name="bottom" />
        </transition>

        <CookieInfo v-if="this.$store.getters['cookieNotice']" />

        <transition-group appear name="fade" mode="out-in">
            <Update v-if="this.$store.getters['updating']" key="updater" />
            <AuthRefresh v-if="this.$store.getters['refreshing']" key="refresher" />
        </transition-group>

        <Alerts />

    </v-app>
</template>

<script>
import Drawer from '@/components/nav/drawer/'
import Alerts from '@/components/Alerts'

const CookieInfo = () => import('@/components/CookieInfo')
const Update = () => import('@/components/Update')
const AuthRefresh = () => import('@/components/AuthRefresh')

export default {
    name: 'App',

    components: {
        Drawer, Alerts, CookieInfo, Update, AuthRefresh
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
    },

    mounted () {
        if (this.$store.getters['auth/authorized']) this.$store.dispatch('auth/loadInit')
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
