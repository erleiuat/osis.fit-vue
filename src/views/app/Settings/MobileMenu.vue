<template>
    <vcontainer fluid>

        <v-list dense>
            <v-subheader>GENERAL</v-subheader>
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

            <v-subheader>SECURITY</v-subheader>
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

            <v-subheader>APP</v-subheader>
            <v-list-item-group>

                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="mode" color="primary"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dark</v-list-item-title>
                        <v-list-item-subtitle>App Design</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-select v-model="lang" :items="langs" :label="$t('language')" outlined hide-details />
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-list>

    </vcontainer>
</template>

<script>
export default {
    name: 'MobileMenu',

    data () {
        return {
            items: [
                { title: 'Profile', icon: 'account_circle', to: '' },
                { title: 'Aims', icon: 'done_all', to: '' },
                { title: 'Premium', icon: 'star', to: '' }
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
                aims: '',
                premium: '',

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
