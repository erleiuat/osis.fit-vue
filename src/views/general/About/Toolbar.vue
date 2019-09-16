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
        <template v-slot:toggler v-else-if="showBack">
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
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
        },
        showBack () {
            if (this.$route.name !== 'about') return true
            else return false
        }
    }

}
</script>
