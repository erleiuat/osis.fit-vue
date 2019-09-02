<template>
    <Default>

        <div v-if="!$store.getters['auth/authorized']" />

        <template v-slot:toggler v-if="!$store.getters['auth/authorized']">
            <v-toolbar-items>
                <v-btn text :to="{name: 'auth.login'}">
                    {{ $t('view.auth.login.title') }}
                </v-btn>
                <v-btn text :to="{name: 'auth.register'}">
                    {{ $t('view.auth.register.title') }}
                </v-btn>
            </v-toolbar-items>
        </template>

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
