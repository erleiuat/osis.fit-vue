<template>
    <vcontainer>
        <v-row>

            <v-col cols="6">
                <v-card flat>
                    <v-card-title>
                        {{ $t('app') }}
                    </v-card-title>
                    <v-card-text>
                        <v-list-item-group>
                            <v-list-item link @click="mode = !mode">
                                <v-list-item-action>
                                    <v-checkbox v-model="mode" readonly color="primary" />
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{ $t('dark') }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ $t('appdesign') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="lang = (lang === 'en' ? 'de' : 'en')">
                                <v-list-item-action class="text-center">
                                    <v-icon>language</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{ $t('language') }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ $t('lang.'+lang) }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card flat>
                    <v-card-title>
                        {{ $t('notifications') }}
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center">
                            <v-col cols="12">
                                {{ $t('soon') }}
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-card flat>
                    <v-tabs grow fixed style="min-height: 400px;">
                        <v-tab v-for="(item, key) in items" :key="key" :to="{name: item.to}" class="ml-0">
                            <v-icon left>{{item.icon}}</v-icon>
                            {{item.title}}
                        </v-tab>
                        <v-tabs-items class="pt-4 pb-4">
                            <router-view />
                        </v-tabs-items>
                    </v-tabs>
                </v-card>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'DesktopMenu',

    mounted () {
        if (this.$route.name === 'settings') this.$router.replace({ name: 'settings.profile' })
    },

    computed: {
        items () {
            return [
                { title: this.$t('profile'), icon: 'account_circle', to: 'settings.profile' },
                { title: this.$t('metabolism'), icon: 'rotate_90_degrees_ccw', to: 'settings.metabolism' },
                { title: this.$t('aims'), icon: 'done_all', to: 'settings.aims' },
                { title: this.$t('premium'), icon: 'star', to: 'settings.premium' },
                { title: this.$t('account'), icon: 'settings', to: 'settings.account' }
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
