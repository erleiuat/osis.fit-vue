<template>
    <vcontainer align="space-evenly">

        <v-row>
            <v-col cols="12">

            </v-col>
            <v-col cols="12">
                <v-tabs vertical grow style="min-height: 400px;">

                    <v-tab v-for="(item, key) in items" :key="key" :to="{name: item.to}">
                        <v-icon left>{{item.icon}}</v-icon>
                        {{item.title}}
                    </v-tab>

                    <v-tabs-items>
                        <router-view />
                    </v-tabs-items>

                </v-tabs>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                Aha
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import EditAims from '@/views/app/Settings/Aims'
import EditProfile from '@/views/app/Settings/Profile'
import Premium from '@/views/app/Settings/Premium'

import user from '@/store/modules/user'

export default {
    name: 'DesktopMenu',

    components: {
        EditAims, EditProfile, Premium
    },

    modules: {
        user
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    data () {
        return {
            items: [
                { title: this.$t('profile'), icon: 'account_circle', to: 'settings.profile' },
                { title: this.$t('aims'), icon: 'done_all', to: 'settings.aims' },
                { title: this.$t('premium'), icon: 'star', to: 'settings.premium' }
            ]
        }
    },

    computed: {
        langs () {
            return [
                { text: this.$t('lang.en'), value: 'en' },
                { text: this.$t('lang.de'), value: 'de' }
            ]
        },
        lang: {
            get () {
                return this.$store.getters['locale']
            },
            set (val) {
                this.$store.commit('setLocale', val)
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
    },

    i18n: {
        messages: {
            en: {
                general: 'GENERAL',
                profile: 'Profile',
                aims: 'Aims',
                premium: 'Premium',
                account: 'ACCOUNT',
                password: 'Change Password',
                getdata: 'Download your data',
                delete: 'Delete Account',
                app: 'APP',
                dark: 'Darkmode',
                appdesign: 'App design',
                language: 'Language',
                lang: {
                    de: 'German',
                    en: 'English'
                },
                notifications: 'NOTIFICATIONS',
                soon: 'Coming soon'
            },
            de: {
                general: 'ALLGEMEIN',
                profile: 'Profil',
                aims: 'Ziele',
                premium: 'Premium',
                account: 'KONTO',
                password: 'Passwort ändern',
                getdata: 'Daten herunterladen',
                delete: 'Konto löschen',
                app: 'ANWENDUNG',
                dark: 'Dunkelmodus',
                appdesign: 'Design der App',
                language: 'Sprache',
                lang: {
                    de: 'Deutsch',
                    en: 'Englisch'
                },
                notifications: 'BENACHRICHTIGUNGEN',
                soon: 'Bald verfügbar'
            }
        }
    }

}
</script>
