<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-tabs grow slider-color="primary">
                <v-tab :to="{name: 'terms' }" ripple>{{ $t('overview') }}</v-tab>
                <v-tab :to="{name: 'terms.cookie' }" ripple>Cookies</v-tab>
            </v-tabs>
            <router-view></router-view>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    name: 'Terms',

    i18n: {
        messages: {
            en: {
                overview: 'Overview'
            },
            de: {
                overview: 'Übersicht'
            }
        }
    }

}
</script>
