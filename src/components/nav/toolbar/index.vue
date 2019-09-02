<template>
    <Default>
        <v-toolbar-items v-if="!$store.getters['auth/authorized']">
            <v-btn text :to="{name: 'auth.login'}">
                {{ $t('view.auth.login.title') }}
            </v-btn>
            <v-btn text :to="{name: 'auth.register'}">
                {{ $t('view.auth.register.title') }}
            </v-btn>
        </v-toolbar-items>
        <v-app-bar-nav-icon @click.stop="drawer()" v-if="$store.getters['auth/authorized']" />
        <v-spacer />
        <v-toolbar-title v-if="$store.getters['auth/authorized']">
            {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <Icon />
    </Default>
</template>

<script>
import Default from '@/components/nav/toolbar/Default'
import Icon from '@/components/nav/toolbar/Icon'

export default {
    name: 'Toolbar',

    components: {
        Default,Icon
    },

    computed: {
        title () {
            return this.$t('view.' + this.$route.name + '.title')
        }
    },

    methods: {
        drawer () {
            this.$store.dispatch('drawer')
        }
    }

}
</script>
