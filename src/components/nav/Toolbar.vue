<template>
    <v-app-bar app clipped-left flat>

        <v-toolbar-title v-if="$route.name">
            {{ $t('view.'+$route.name+'.title') }}
        </v-toolbar-title>

        <v-toolbar-title v-else>
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
