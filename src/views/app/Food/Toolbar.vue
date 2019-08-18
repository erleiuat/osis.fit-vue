<template>
    <Default>
        <v-app-bar-nav-icon @click.stop="drawer()" />
        <v-spacer />
        <v-text-field v-model="query" clearable hide-details single-line append-icon="search" />
        <v-spacer />
    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    components: {
        Default
    },

    computed: {
        query: {
            get () {
                return this.$route.query.s
            },
            set (val) {
                this.$router.replace({ query: { s: val } })
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
