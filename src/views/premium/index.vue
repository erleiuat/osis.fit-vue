<template>
    <v-container grid-list-xl>
        <v-layout wrap>
            <v-flex xs12>
                <div class="display-1">
                    {{ $t('getPremium') }}
                </div>
            </v-flex>
            <v-flex xs12>
                Einige Funktionen...
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-flex xs8></v-flex>
            <v-flex xs2 text-center>
                Premium
            </v-flex>
            <v-flex xs2 text-center>
                Free
            </v-flex>
        </v-layout>

        <v-layout wrap v-for="(f, key) in features" :key="key" align-center>
            <v-flex xs8>
                {{ f[0] }}
            </v-flex>
            <v-flex xs2 text-center>
                <v-icon v-if="f[1]" large color="success">check</v-icon>
                <v-icon v-else large color="error">remove</v-icon>
            </v-flex>
            <v-flex xs2 text-center>
                <v-icon v-if="f[2]" large color="success">check</v-icon>
                <v-icon v-else large color="error">remove</v-icon>
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-btn color="primary" block :to="{name: 'settings'}">
                {{ $t('getPremium') }}
            </v-btn>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    name: 'Overview',

    computed: {
        features () {
            return [
                [this.$t('features.f1'), true, false],
                [this.$t('features.f2'), true, false],
                [this.$t('features.f3'), true, false],
                [this.$t('features.f4'), true, false],
                [this.$t('features.f5'), true, false]
            ]
        }
    },

    mounted () {
        if (this.$route.query.notify)
            this.$notify({ type: 'info', title: this.$t('alert.premiumOnly') })
    },

    i18n: {
        messages: {
            en: {
                getPremium: 'Get Premium',
                features: {
                    f1: 'Esswaren mit Bildern erstellen'
                }
            },
            de: {
                getPremium: 'Premium erhalten',
                features: {
                    f1: 'Esswaren mit Bildern erstellen',
                    f2: 'Datenbank mit Esswaren durchsuchen',
                    f3: 'Aktivitäten speichern',
                    f4: 'Trainingspläne erstellen',
                    f5: 'Fitness-Tracker verknüpfen'
                }
            }
        }
    }

}
</script>
