<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-tabs grow slider-color="primary">
                <v-tab :to="{name: 'help' }" ripple>FAQ</v-tab>
                <v-tab :to="{name: 'help.contact' }" ripple>{{ $t('contact') }}</v-tab>
            </v-tabs>
            <router-view></router-view>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'Help',

    i18n: {
        messages: {
            en: {
                contact: 'Contact'
            },
            de: {
                contact: 'Kontakt'
            }
        }
    }

}
</script>
