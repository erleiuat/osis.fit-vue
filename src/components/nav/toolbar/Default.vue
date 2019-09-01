<template>
    <div>

        <v-app-bar v-if="use.t1" app color="primary" dark elevate-on-scroll hide-on-scroll>
            <slot />
        </v-app-bar>

        <v-app-bar v-if="use.t2" class="mt-3 ml-3 mr-3" dense app color="primary" dark elevate-on-scroll hide-on-scroll :tile="false">
            <slot />
        </v-app-bar>

        <v-app-bar v-if="use.t3" app color="primary" elevate-on-scroll hide-on-scroll dark>
            <slot />
        </v-app-bar>

    </div>
</template>

<script>
export default {
    name: 'Default',

    computed: {

        use () {
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
        }

    }

}
</script>
