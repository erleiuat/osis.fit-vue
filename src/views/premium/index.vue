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
            <v-col cols="12" sm="8">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(f, key) in features" :key="key">
                        <v-expansion-panel-header class="subheader">
                            {{ f.title }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content eager>
                            {{ f.text }}
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <!-- TODO
        <v-row justify="center">
            <v-col cols="12" sm="8">
                {{ $t('priceText') }}
            </v-col>
            <v-col cols="12" sm="8">
                10
            </v-col>
        </v-row>
        -->

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
                { title: this.$t('features.f1.title'), text: this.$t('features.f1.text') },
                { title: this.$t('features.f2.title'), text: this.$t('features.f2.text') },
                { title: this.$t('features.f3.title'), text: this.$t('features.f3.text') },
                { title: this.$t('features.f4.title'), text: this.$t('features.f4.text') },
                { title: this.$t('features.f5.title'), text: this.$t('features.f5.text') },
                { title: this.$t('features.f6.title'), text: this.$t('features.f6.text') },
                { title: this.$t('features.f7.title'), text: this.$t('features.f7.text') }
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
                text: 'Get your premium Osis.fit subscription today to unlock many additional features.',
                getPremium: 'Get Premium!',
                features: {
                    f1: {
                        title: 'Edibles with pictures',
                        text: 'Create your own templates and add an image to find the entry faster.'
                    },
                    f2: {
                        title: 'Food database',
                        text: 'Search a huge database of products to get the nutritional values faster.'
                    },
                    f3: {
                        title: 'Barcode-Scanner',
                        text: 'Scan the barcode of a product to preserve its nutritional value.'
                    },
                    f4: {
                        title: 'Track activities',
                        text: 'Record additional activities to accurately calculate your calorie balance.'
                    },
                    f5: {
                        title: 'Exercises & Training Plans',
                        text: 'Browse or create fitness exercises to add to a training plan, or explore new training plans with our templates.'
                    },
                    f6: {
                        title: 'Add profile picture',
                        text: 'Add a profile picture to your account to further personalize the app and make it easier to be recognized by (upcoming) community features.'
                    },
                    f7: {
                        title: 'Priority Support',
                        text: 'Problems or questions about the app? Support requests from premium users are prioritized and processed faster.'
                    }
                }
            },
            de: {
                title: 'Premium',
                text: 'Hole dir noch heute dein Premium-Abonnement von Osis.fit um zahlreiche zusätzliche Funktionen freizuschalten.',
                getPremium: 'Premium holen!',
                features: {
                    f1: {
                        title: 'Esswaren mit Bildern',
                        text: 'Erstelle eigene Vorlagen und füge ein Bild hinzu, um den Eintrag später schneller zu finden.'
                    },
                    f2: {
                        title: 'Lebensmittel-Datenbank',
                        text: 'Durchsuche eine riesige Datenbank von Produkten um schneller die Nährwerte zu erhalten.'
                    },
                    f3: {
                        title: 'Barcode-Scanner',
                        text: 'Scanne den Barcode eines Produkts um dessen Nährwerte zu erhalten.'
                    },
                    f4: {
                        title: 'Aktivitäten aufzeichen',
                        text: 'Zeiche zusätzliche Aktivitäten auf, um deine Kalorienbilanz genau zu berechnen.'
                    },
                    f5: {
                        title: 'Übungen & Trainingspläne',
                        text: 'Durchsuche oder erstelle Fitness-Übungen um diese einem Trainingsplan hinzuzufügen, oder finde neue Trainingspläne durch unsere Vorlagen.'
                    },
                    f6: {
                        title: 'Profilbild einstellen',
                        text: 'Füge ein Profilbild zu deinem Konto hinzu, um die App weiter zu personalisieren und bei (kommenden) Community-Funktionen besser erkannt zu werden.'
                    },
                    f7: {
                        title: 'Priorisierter Support',
                        text: 'Probleme oder Fragen zur App? Support-Anfragen von Premium-Nutzern werden priorisiert und schneller bearbeitet.'
                    }
                }
            }
        }
    }

}
</script>
