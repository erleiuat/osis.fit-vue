<template>
    <div>

        <v-app-bar v-if="mobile" :style="style" scroll-threshold="50" app dense elevate-on-scroll hide-on-scroll>
            <slot />
        </v-app-bar>

        <v-app-bar v-else app elevate-on-scroll hide-on-scroll>
            <slot />
        </v-app-bar>

        <!--
        <v-app-bar v-if="use.t2" class="mt-3 ml-3 mr-3" dense app elevate-on-scroll hide-on-scroll :tile="false">
            <slot />
        </v-app-bar>
        -->

    </div>
</template>

<script>
export default {
    name: 'Default',

    computed: {

        style () {
            var border = ''
            if (this.$store.getters['app'].dark) border = 'border-bottom: 1px solid rgba(255,255,255,.0975)'
            else border = 'border-bottom: 1px solid rgba(0,0,0,.0975)'
            return border
        },

        mobile () {
            return this.$vuetify.breakpoint.xsOnly
            /*
            var tb = {
                t1: false,
                t2: false,
                t3: false
            }

            if (this.$vuetify.breakpoint.xsOnly) {
                if (this.$store.getters['toolbar2']) tb.t2 = true
                else tb.t1 = true
            } else tb.t3 = true

            return tb
            */
        }

    }

}
</script>
