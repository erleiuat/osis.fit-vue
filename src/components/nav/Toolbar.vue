<template>
    <v-toolbar app clipped-left flat class="nav-flat" extended extension-height="0">

        <v-toolbar-title v-if="$route.name">
            <h1 class="headline font-weight-medium">{{ $t('view.'+$route.name+'.title') }}</h1>
        </v-toolbar-title>

        <v-toolbar-title v-else>
            Osis.fit
        </v-toolbar-title>

        <v-spacer />
        <v-toolbar-side-icon @click.stop="drawer()" />

        <v-progress-linear slot="extension" :active="showLoad" indeterminate class="ma-0" height="4" style="top: -2px;" />

    </v-toolbar>
</template>

<script>
export default {
    name: 'Toolbar',

    computed: {

        showLoad () {
            if (this.$store.state.app.routing)
                return true

            if (this.$store.state.app.loading)
                return true

            return false
        }

    },

    methods: {
        drawer () {
            this.$store.commit('drawer', !this.$store.state.app.drawer)
        }
    }

}
</script>
<style>
.v-toolbar__extension {
  padding: 0px !important;
}
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>
