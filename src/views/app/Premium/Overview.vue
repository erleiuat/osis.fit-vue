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
            <v-btn color="primary" block @click="openCheckout()">
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
        /*
        let script = document.createElement('script')

        script.onload = () => {
            this.cBee = Chargebee.init({
                site: 'osis-fit-test'
            })
        }

        script.async = true
        script.id = 'chargebee'
        script.src = 'https://js.chargebee.com/v2/chargebee.js'

        document.getElementsByTagName('head')[0].appendChild(script)
        */
    },

    methods: {

        openCheckout () {
            window.open('https://osis-fit-test.chargebee.com/hosted_pages/plans/premium', '_blank')

            /*
            var chargebeeInstance = Chargebee.getInstance()

            chargebeeInstance.openCheckout({
                // This function returns a promise that resolves a hosted page object.
                // If the library that you use for making ajax calls, can return a promise, you can directly return that

                hostedPage: function () {
                    // We will discuss on how to implement this end point in the next step.
                    return Axios.post('/generate_hp_url', {
                        customer_id: this.customer_id,
                        plan_id: this.plan_id
                    }).then((response) => response.data)
                },

                success: function (hostedPageId) {
                    // success callback
                }
            })
            */
        }

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
