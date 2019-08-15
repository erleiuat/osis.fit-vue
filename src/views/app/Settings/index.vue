<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-lg'">

        <v-layout wrap v-if="!$store.getters['auth/premium']">
            <v-flex xs12>
                <Subscription />
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <EditAims />
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <EditProfile />
            </v-flex>
        </v-layout>

        <v-layout wrap v-if="$store.getters['auth/premium']">
            <v-flex xs12>
                <Subscription />
            </v-flex>
        </v-layout>

        <v-layout wrap justify-space-around pa-2>
            <v-flex xs12>
                <h3 class="display-2">{{ $t('account') }}</h3>
            </v-flex>
            <v-flex shrink class="text-center">
                <v-switch v-model="mode" :label="$t('darkmode')"></v-switch>
            </v-flex>
            <v-flex shrink>
                <v-select v-model="lang" :items="langs" :label="$t('language')" />
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around>
            <v-flex xs12 sm6 md4>
                <v-btn disabled block>{{ $t('changePass') }}</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-btn disabled block>{{ $t('getData') }}</v-btn>
            </v-flex>
            <v-flex xs12 md4>
                <v-btn disabled block>{{ $t('deleteAcc') }}</v-btn>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import EditAims from '@/views/app/Settings/Aims'
import EditProfile from '@/views/app/Settings/Profile'
import Subscription from '@/views/app/Settings/Subscription'
import i18n from '@/plugins/i18n'
import VueCookies from 'vue-cookies'

import storeModule from '@/store/modules/user'

export default {
    name: 'Settings',

    components: {
        EditAims, EditProfile, Subscription
    },

    data () {
        return {
            langs: [
                { text: this.$t('lang.en'), value: 'en' },
                { text: this.$t('lang.de'), value: 'de' }
            ]
        }
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    created () {
        this.$store.useModule(storeModule)
    },

    computed: {

        mode: {
            get () {
                return VueCookies.get('themeDark')
            },
            set (val) {
                this.$vuetify.theme.dark = val
                if (val) VueCookies.set('themeDark', val)
                else VueCookies.remove('themeDark')
            }
        },

        lang: {
            get () {
                return VueCookies.get('appLang') || navigator.language || navigator.userLanguage
            },
            set (val) {
                i18n.locale = val
                VueCookies.set('appLang', val)
            }
        }

    },

    i18n: {
        messages: {
            en: {
                language: 'Language',
                darkmode: 'Darkmode',
                account: 'Account',
                changePass: 'Change Password',
                getData: 'Get all my Data',
                deleteAcc: 'Delete my Account',
                lang: {
                    de: 'German',
                    en: 'English'
                }
            },
            de: {
                language: 'Sprache',
                darkmode: 'Dunkelmodus',
                account: 'Konto',
                changePass: 'Password ändern',
                getData: 'Meine Daten herunterladen',
                deleteAcc: 'Konto löschen',
                lang: {
                    de: 'Deutsch',
                    en: 'Englisch'
                }
            }
        }
    }

}
</script>
