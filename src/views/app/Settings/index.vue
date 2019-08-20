<template>
    <v-container grid-list-md>

        <v-layout wrap>
            <v-flex xs12 lg4 v-if="!$store.getters['premium']">
                <Subscription />
            </v-flex>
            <v-flex xs12 lg3>
                <EditAims />
            </v-flex>
            <v-flex xs12 lg5>
                <EditProfile />
            </v-flex>
            <v-flex xs12 lg4 v-if="$store.getters['premium']">
                <Subscription />
            </v-flex>
        </v-layout>

        <v-layout wrap align-center>
            <v-flex xs6 sm4 md2 class="text-center">
                <v-switch v-model="mode" :label="$t('darkmode')"></v-switch>
            </v-flex>
            <v-flex xs6 sm4 md2 class="text-center">
                <v-switch v-model="tool" :label="$t('toolbar')"></v-switch>
            </v-flex>
            <v-flex xs12 sm8 md3>
                <v-select v-model="lang" :items="langs" :label="$t('language')" />
            </v-flex>
            <v-flex xs12 sm6 md2>
                <v-btn disabled block>{{ $t('changePass') }}</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md3>
                <v-btn disabled block>{{ $t('getData') }}</v-btn>
            </v-flex>
            <v-flex xs12 md2>
                <v-btn disabled block>{{ $t('deleteAcc') }}</v-btn>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import EditAims from '@/views/app/Settings/Aims'
import EditProfile from '@/views/app/Settings/Profile'
import Subscription from '@/views/app/Settings/Subscription'

import user from '@/store/modules/user'

export default {
    name: 'Settings',

    components: {
        EditAims, EditProfile, Subscription
    },

    modules: {
        user
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    computed: {

        langs () {
            return [
                { text: this.$t('lang.en'), value: 'en' },
                { text: this.$t('lang.de'), value: 'de' }
            ]
        },

        tool: {
            get () {
                return this.$store.getters['toolbar2']
            },
            set (val) {
                this.$store.commit('setToolbar2', val)
            }
        },

        mode: {
            get () {
                return this.$store.getters['dark']
            },
            set (val) {
                this.$store.commit('setDark', val)
            }
        },

        lang: {
            get () {
                return this.$store.getters['locale']
            },
            set (val) {
                this.$store.commit('setLocale', val)
            }
        }

    },

    i18n: {
        messages: {
            en: {
                language: 'Language',
                darkmode: 'Darkmode',
                toolbar: 'Toolbar 2',
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
                toolbar: 'Navigation 2',
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
