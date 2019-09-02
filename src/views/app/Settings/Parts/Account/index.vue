<template>
    <v-expansion-panels popout accordion v-model="openPanel">
        <v-expansion-panel>
            <v-expansion-panel-header>
                {{ $t('change') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <Change />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>
                {{ $t('download') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>
                {{ $t('delete') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import Change from '@/views/app/Settings/Parts/Account/Change'

export default {
    name: 'EditAccount',

    components: {
        Change
    },

    data () {
        return {
            openPanel: null
        }
    },

    beforeMount () {
        var qry = this.$route.query.s
        if (qry) {
            if (qry === 'password') this.openPanel = 0
            else if (qry === 'download') this.openPanel = 1
            else if (qry === 'delete') this.openPanel = 2
        }
    },

    i18n: {
        messages: {
            en: {
                change: 'Change Password',
                download: 'Download Data',
                delete: 'Delete Account'
            },
            de: {
                change: 'Passwört ändern',
                download: 'Daten herunterladen',
                delete: 'Konto löschen'
            }
        }
    }

}
</script>
