<template>
    <v-app-bar clipped-left app flat color="primary" dark>


        <v-toolbar-title>
            Osis.fit
        </v-toolbar-title>
        <v-spacer />
        <v-app-bar-nav-icon @click.stop="drawer()" />

    </v-app-bar>
</template>

<script>
export default {
    name: 'Toolbar',

    methods: {
        drawer () {
            this.$store.dispatch('app/drawer')
        }
    }

}
</script>
