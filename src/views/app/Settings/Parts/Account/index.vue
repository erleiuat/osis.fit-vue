<template>
    <v-expansion-panels v-model="openPanel" popout>
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('change') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content eager>
                <Change />
            </v-expansion-panel-content>
            <v-divider />
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('download') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content eager>
                <Download />
            </v-expansion-panel-content>
            <v-divider />
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('delete') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content eager>
                <Delete />
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import Change from '@/views/app/Settings/Parts/Account/Change'
import Download from '@/views/app/Settings/Parts/Account/Download'
import Delete from '@/views/app/Settings/Parts/Account/Delete'

export default {
    name: 'EditAccount',

    components: {
        Change, Download, Delete
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
