<template>
    <div>

        <v-app-bar v-if="mobile" :style="style" scroll-threshold="50" app dense elevate-on-scroll hide-on-scroll>
            <slot name="toggler">
                <v-app-bar-nav-icon @click.stop="drawer()" />
            </slot>
            <slot>
                <v-spacer />
                <v-toolbar-title>
                    {{ title }}
                </v-toolbar-title>
            </slot>
            <slot name="icon">
                <v-spacer />
                <Icon />
            </slot>
        </v-app-bar>

        <v-app-bar v-else app elevate-on-scroll hide-on-scroll>
            <slot name="toggler">
                <v-app-bar-nav-icon @click.stop="drawer()" />
            </slot>
            <slot>
                <v-spacer />
                <v-toolbar-title>
                    {{ title }}
                </v-toolbar-title>
            </slot>
            <slot name="icon">
                <v-spacer />
                <v-img :src="require('@/assets/img/svg/logo_outline_white.svg')" v-if="$store.getters['app'].dark" :max-height="imgSize" :max-width="imgSize" contain />
                <v-img :src="require('@/assets/img/svg/logo.svg')" v-else :max-height="imgSize" :max-width="imgSize" contain />
            </slot>
        </v-app-bar>

    </div>
</template>

<script>

export default {
    name: 'Default',

    computed: {

        imgSize () {
            if (this.$vuetify.breakpoint.xsOnly) return 30
            else return 40
        },

        title () {
            return this.$t('view.' + this.$route.name + '.title')
        },

        style () {
            var border = ''
            if (this.$store.getters['app'].dark) border = 'border-bottom: 1px solid rgba(255,255,255,.0975)'
            else border = 'border-bottom: 1px solid rgba(0,0,0,.0975)'
            return border
        },

        mobile () {
            return this.$vuetify.breakpoint.xsOnly
        }

    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
