<template>
    <v-app-bar app clipped-left flat>

        <v-toolbar-title v-if="$route.name">
            {{ $t('view.'+$route.name+'.title') }}
        </v-toolbar-title>

        <v-toolbar-title v-else>
            Osis.fit
        </v-toolbar-title>

        <v-progress-linear :indeterminate="false" absolute bottom />

        <v-spacer />

        <v-app-bar-nav-icon @click.stop="drawer()" />

    </v-app-bar>
</template>

<script>
export default {
    name: 'Toolbar',

    methods: {
        drawer () {
            this.$store.commit('drawer', !this.$store.state.app.drawer)
        }
    }

}
</script>
