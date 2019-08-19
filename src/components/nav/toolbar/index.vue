<template>
    <Default>
        <v-app-bar-nav-icon @click.stop="drawer()" />
        <v-spacer />
        <v-toolbar-title>
            {{ title }}
        </v-toolbar-title>
    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    components: {
        Default
    },

    data () {
        return {
            title: process.env.VUE_APP_NAME
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
