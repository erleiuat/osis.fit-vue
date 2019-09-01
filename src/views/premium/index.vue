<template>
    <vcontainer align="space-evenly">

        <v-row dense justify="center">
            <v-col cols="12" sm="8">
                <div class="display-1">
                    {{ $t('title') }}
                </div>
            </v-col>
            <v-col cols="12" sm="8">
                Hole dir noch heute dein Premium-Abonnement von Osis.fit um zahlreiche Funktionen freizuschalten.
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-divider />
            </v-col>
        </v-row>

        <v-row dense justify="center" v-for="(f, key) in features" :key="key">
            <v-col cols="10">
                {{ f }}
            </v-col>
            <v-col cols="2" class="text-center">
                <v-icon large color="success">check</v-icon>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="12" sm="8">
                <v-btn color="amber" dark depressed block :to="{name: 'settings.premium'}">
                    <strong>{{ $t('getPremium') }}</strong>
                </v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'Overview',

    computed: {
        features () {
            return [
                this.$t('features.f1'),
                this.$t('features.f2'),
                this.$t('features.f3'),
                this.$t('features.f4'),
                this.$t('features.f5'),
                this.$t('features.f6'),
                this.$t('features.f7')
            ]
        }
    },

    mounted () {
        if (this.$route.query.notify) this.$notify({ type: 'info', title: this.$t('alert.premiumOnly') })
    },

    i18n: {
        messages: {
            en: {
                title: 'Premium',
                getPremium: 'Get Premium',
                features: {
                    f1: 'Esswaren mit Bildern erstellen'
                }
            },
            de: {
                title: 'Premium',
                getPremium: 'Premium erhalten',
                features: {
                    f1: 'Esswaren mit Bildern erstellen',
                    f2: 'Datenbank mit Produkten durchsuchen',
                    f3: 'Aktivitäten/Kalorienverbrauch aufzeichen',
                    f4: 'Trainingspläne erstellen & druchsuchen',
                    f5: 'Fitness-Tracker verknüpfen (bald verfügbar)',
                    f6: 'Werbung entfernen',
                    f7: 'Detailierten Tagesbedarf berechnen'
                }
            }
        }
    }

}
</script>
