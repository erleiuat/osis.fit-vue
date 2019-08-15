<template>
    <v-app-bar clipped-left app flat color="primary" dark>

        <v-toolbar-title>
            {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon @click.stop="drawer()" />

    </v-app-bar>
</template>

<script>
export default {
    name: 'Toolbar',

    data () {
        return {
            title: process.env.VUE_APP_TITLE
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('app/drawer')
        }
    }

}
</script>
