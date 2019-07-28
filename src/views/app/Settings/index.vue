<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-lg'">

        <v-layout row wrap>
            <v-flex xs12>
                <EditAims />
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <EditProfile />
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-around pa-2>
            <v-flex xs12>
                <h3 class="display-2">{{ $t('account') }}</h3>
            </v-flex>
            <v-flex shrink class="text-center">
                <v-switch :label="$t('darkmode')" @change="changeMode()" v-model="mode"></v-switch>
            </v-flex>
            <v-flex shrink>
                <v-select :label="$t('language')" @input="changeLang()" v-model="language" :items="langs" />
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

export default {
    name: 'Settings',

    components: {
        EditAims, EditProfile
    },

    data () {
        return {
            langs: [
                { text: this.$t('l.en'), value: 'en' },
                { text: this.$t('l.de'), value: 'de' }
            ],
            language: this.$store.state.app.language,
            mode: this.$store.state.app.dark
        }
    },

    methods: {
        changeLang () {
            this.$store.state.app.language = this.language
            this.$cookies.set('client_language', this.language)
        },
        changeMode () {
            this.$store.state.app.dark = this.mode
            this.$cookies.set('client_darkmode', this.mode)
        }
    },

    mounted () {
        var vm = this
        vm.$http.get('user/read/').then(function (r) {
            vm.$store.state.user = r.data.user
        }).catch(function () {
            vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
        })
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
                l: {
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
                l: {
                    de: 'Deutsch',
                    en: 'Englisch'
                }
            }
        }
    }

}
</script>
