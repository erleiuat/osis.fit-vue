<template>
    <v-list dense>

        <v-subheader>{{ $t('general') }}</v-subheader>
        <v-list-item-group color="primary">
            <v-list-item v-for="(item, key) in items" :key="key" :to="{name: item.to}">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

        <v-subheader>{{ $t('account') }}</v-subheader>
        <v-list-item-group color="primary">
            <v-list-item :to="{ name: 'settings.account', query: {s:'password'} }">
                <v-list-item-icon>
                    <v-icon>lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('password') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'settings.account', query: {s:'download'} }">
                <v-list-item-icon>
                    <v-icon>arrow_downward</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('getdata') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'settings.account', query: {s:'delete'} }">
                <v-list-item-icon>
                    <v-icon>delete_forever</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('delete') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

        <v-subheader>{{ $t('app') }}</v-subheader>
        <v-list-item-group>
            <v-list-item>
                <v-list-item-action>
                    <v-checkbox v-model="mode" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('dark') }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('appdesign') }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('language') }}</v-list-item-title>
                    <v-select v-model="lang" :items="langs" solo flat hide-details />
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

        <v-subheader>{{ $t('notifications') }}</v-subheader>
        <v-list-item-group>
            <v-list-item>
                <v-list-item-content class="caption">
                    {{ $t('soon') }}
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>

    </v-list>
</template>

<script>
export default {
    name: 'MobileMenu',

    data () {
        return {
            items: [
                { title: this.$t('profile'), icon: 'account_circle', to: 'settings.profile' },
                { title: this.$t('metabolism'), icon: 'rotate_90_degrees_ccw', to: 'settings.metabolism' },
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
                return this.$store.getters['app'].locale
            },
            set (val) {
                this.$store.commit('setLocale', val)
            }
        },
        mode: {
            get () {
                return this.$store.getters['app'].dark
            },
            set (val) {
                this.$store.commit('setDark', val)
            }
        }
    },

    i18n: {
        messages: {
            en: {
                general: 'GENERAL',
                profile: 'Profile',
                metabolism: 'Metabolism',
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
                metabolism: 'Stoffwechsel',
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
