<template>
    <v-app-bar class="mt-2 ml-2 mr-2" dense app color="primary" dark elevate-on-scroll hide-on-scroll :tile="false">

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <v-text-field v-model="query" v-if="show.search" hide-details append-icon="search" single-line clearable />



    </v-app-bar>
</template>

<script>
export default {
    name: 'ToolbarMobile',

    computed: {
        show() {
            return this.$store.getters['toolbar/show']
        },
        query: {
            get() {
                this.$store.getters['toolbar/search']
            },
            set(val) {
                this.$store.commit('toolbar/search', val)
            }
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
