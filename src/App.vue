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
        <Update v-if="this.$store.getters['updating']" />
        <Alerts />

    </v-app>
</template>

<script>
import Drawer from '@/components/nav/drawer/'
import Alerts from '@/components/Alerts'

const CookieInfo = () => import('@/components/CookieInfo')
const Update = () => import('@/components/Update')

export default {
    name: 'App',

    components: {
        Drawer, Alerts, CookieInfo, Update
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
