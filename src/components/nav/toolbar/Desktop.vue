<template>
    <v-app-bar app color="primary" elevate-on-scroll hide-on-scroll dark>

        <v-app-bar-nav-icon @click.stop="drawer()" />
        <v-spacer />
        <v-toolbar-title>
            {{ title }}
        </v-toolbar-title>

    </v-app-bar>
</template>

<script>
export default {
    name: 'ToolbarDesktop',

    data () {
        return {
            title: process.env.VUE_APP_TITLE
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
