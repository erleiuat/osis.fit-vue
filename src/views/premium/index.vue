<template>
    <vcontainer align="space-evenly">

        <v-row dense justify="center">
            <v-col cols="12" sm="8">
                <div class="display-1">
                    {{ $t('title') }}
                </div>
            </v-col>
            <v-col cols="12" sm="8">
                {{ $t('text') }}
            </v-col>
        </v-row>

        <v-row dense justify="center">
            <v-expansion-panels>
                <v-expansion-panel v-for="(f, key) in features" :key="key">
                    <v-expansion-panel-header class="subheader">
                        {{ f }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content eager>
                        <v-divider />
                        {{ f }}
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>

        <v-row justify="center">
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
                text: 'Hole dir noch heute dein Premium-Abonnement von Osis.fit um zahlreiche Funktionen freizuschalten.',
                getPremium: 'Get Premium',
                features: {
                    f1: 'Esswaren mit Bildern',
                    f2: 'Produkt-Datenbank',
                    f3: 'Barcode-Scanner',
                    f4: 'Aktivitäten aufzeichen',
                    f5: 'Übungen & Trainingspläne',
                    f6: 'Profilbild einstellen',
                    f7: 'Priorisierter Support'
                }
            },
            de: {
                title: 'Premium',
                text: 'Hole dir noch heute dein Premium-Abonnement von Osis.fit um zahlreiche Funktionen freizuschalten.',
                getPremium: 'Premium erhalten',
                features: {
                    f1: 'Esswaren mit Bildern erstellen',
                    f2: 'Datenbank mit Produkten durchsuchen',
                    f3: 'Aktivitäten/Kalorienverbrauch aufzeichen',
                    f4: 'Trainingspläne erstellen & druchsuchen'
                }
            }
        }
    }

}
</script>
