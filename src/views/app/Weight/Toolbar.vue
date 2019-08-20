<template>
    <Default>

        <v-app-bar-nav-icon @click.stop="drawer()" />

        <v-spacer />

        <v-btn @click="openEditor()" v-if="$vuetify.breakpoint.mdAndUp" large text>
            <v-icon left>add</v-icon> {{ $t('btn.add') }}
        </v-btn>
        
    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'

export default {
    name: 'Toolbar',

    data () {
        return {
            search: false
        }
    },

    components: {
        Default
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
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
    }
}
</script>
