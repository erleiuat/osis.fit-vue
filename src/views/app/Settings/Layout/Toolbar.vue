<template>
    <Default>
        <v-app-bar-nav-icon @click.stop="drawer()" v-if="$route.name === 'settings' || !$vuetify.breakpoint.smAndDown" />
        <v-btn icon v-else @click="$router.go(-1)">
            <v-icon>
                navigate_before
            </v-icon>
        </v-btn>
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

    computed: {
        title() {
            return this.$t('view.'+this.$route.name+'.title')
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
