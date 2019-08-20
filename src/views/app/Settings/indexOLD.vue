<template>
    <vcontainer>

        <v-row>
            <v-col cols="12" lg="4" v-if="!$store.getters['premium']">
                <Premium />
            </v-col>
            <v-col cols="12" lg="3">
                <EditAims />
            </v-col>
            <v-col cols="12" lg="5">
                <EditProfile />
            </v-col>
            <v-col cols="12" lg="4" v-if="$store.getters['premium']">
                <Premium />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-select v-model="lang" :items="langs" :label="$t('language')" outlined hide-details />
            </v-col>
            <v-col align="center">
                <v-radio-group v-model="mode" :label="$t('mode')" row hide-details>
                    <v-radio :label="$t('modeDark')" :value="true" />
                    <v-radio :label="$t('modeLight')" :value="false" />
                </v-radio-group>
            </v-col>
        </v-row>

        <v-row align="center">
            <v-col cols="12" md="4">
                <v-btn disabled block>{{ $t('changePass') }}</v-btn>

            </v-col>
            <v-col cols="12" md="4">
                <v-btn disabled block>{{ $t('getData') }}</v-btn>

            </v-col>
            <v-col cols="12" md="4">
                <v-btn disabled block>{{ $t('deleteAcc') }}</v-btn>

            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import EditAims from '@/views/app/Settings/Aims'
import EditProfile from '@/views/app/Settings/Profile'
import Premium from '@/views/app/Settings/Subscription'

import user from '@/store/modules/user'

export default {
    name: 'Settings',

    components: {
        EditAims, EditProfile, Premium
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
