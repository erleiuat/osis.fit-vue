<template>
    <v-expansion-panels v-model="openPanel" accordion="">
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('change') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-divider />
                <Change />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('download') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-divider />
                <Download />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header class="subheader">
                {{ $t('delete') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-divider />
                <Delete v-if="!$store.getters['auth/premium']" />
                <vcontainer v-else>
                    <v-row dense justify="center">
                        <v-col cols="12" md="7">
                            <v-alert type="warning" outlined>
                                {{ $t('hasPremium') }}
                            </v-alert>
                        </v-col>
                    </v-row>
                </vcontainer>
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
                delete: 'Delete Account',
                hasPremium: 'You still have an active premium subscription! End this first and return as soon as it expires.'
            },
            de: {
                change: 'Passwört ändern',
                download: 'Daten herunterladen',
                delete: 'Konto löschen',
                hasPremium: 'Du hast noch ein aktives Premium-Abonnement! Beende dieses zuerst und kehre zurück sobald es abgelaufen ist.'
            }
        }
    }

}
</script>
