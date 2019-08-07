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
            <v-btn :loading="loadingScript" color="primary" block @click="openCheckout()">
                {{ $t('getPremium') }}
            </v-btn>
        </v-layout>

    </v-container>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Overview',

    data () {
        return {
            cbi: null,
            loadingScript: true,
        }
    },

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

        if (!document.getElementById('chargebee_js_script')) {

            var script = document.createElement('script')
            script.id = 'chargebee_js_script'
            script.src = 'https://js.chargebee.com/v2/chargebee.js'
            script.async = true

            var vm = this
            script.onload = function () {
                Chargebee.init({ site: "osis-fit-test" })
                vm.cbi = Chargebee.getInstance()
                vm.loadingScript = false
            }

            document.getElementsByTagName('head')[0].appendChild(script)

        } else {
            this.cbi = Chargebee.getInstance()
            this.loadingScript = false
        }

    },

    methods: {

        openCheckout () {
            //window.open('https://osis-fit-test.chargebee.com/hosted_pages/plans/premium', '_blank')

            this.cbi.openCheckout({
                hostedPage: () => {
                    // Hit your end point that returns hosted page object as response
                    // This sample end point will call the below api
                    // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_new_subscription
                    // If you want to use paypal, go cardless and plaid, pass embed parameter as false
                    return Apios.get('user/premium/').then((res) => res.data.items);
                },
                loaded: function () {
                    console.log("checkout opened");
                },
                close: () => {
                    console.log("checkout closed");
                },
                success: function (hostedPageId) {
                    console.log(hostedPageId);
                    // Hosted page id will be unique token for the checkout that happened
                    // You can pass this hosted page id to your backend 
                    // and then call our retrieve hosted page api to get subscription details
                    // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
                },
                step: function (value) {
                    // value -> which step in checkout
                    console.log(value);
                },
                error: function (error) {
                    console.log(error);
                }
            });

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
