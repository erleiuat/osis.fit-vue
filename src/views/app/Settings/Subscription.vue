<template>
    <v-card flat :color="premium ? '' : 'info'" :dark="!premium">

        <v-card-title>
            <h3 class="display-2">{{ $t('title') }}</h3>
        </v-card-title>

        <v-card-text>
            <v-layout row wrap overflow-hidden v-if="sub.id">
                <v-flex xs12 sm6>
                    <span class="subheading">{{ $t('subsNr') }}</span><br />
                    <span class="headline">{{ sub.id }}</span>
                </v-flex>
                <v-flex xs6>
                    <span class="subheading">{{ $t('plan') }}</span><br />
                    <span class="headline">{{ sub.plan }}</span>
                </v-flex>
                <v-flex xs6>
                    <span class="subheading">{{ $t('state') }}</span><br />
                    <span class="headline">{{ subStatus.text }}</span>
                </v-flex>
                <v-flex xs6>
                    <span class="subheading">{{ subExpiry.title }}</span><br />
                    <span class="headline">{{ subExpiry.value }}</span>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
                <v-flex xs12>
                    {{ $t('youDontHave') }}
                </v-flex>
            </v-layout>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="openPortal()" :loading="loadingScript" depressed v-if="sub.id">
                {{ $t('btnEdit') }}
            </v-btn>
            <v-btn @click="openCheckout()" :loading="loadingScript" block v-else>
                <strong>{{ $t('btnGet') }}</strong>
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Subscription',

    data () {
        return {
            cbi: false,
            loadingScript: true
        }
    },

    computed: {

        subExpiry () {
            var title = this.$t('renewsOn')
            var date = new Date(this.sub.expiration * 1000)
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()

            if (this.subStatus.value !== 'active') title = this.$t('expiresOn')
            return {
                title: title,
                value: day + '.' + month + '.' + year
            }
        },

        subStatus () {
            var doUse = 'nonExisting'
            var sus = this.sub.status
            if (sus === 'cancelled') doUse = 'cancelled'
            else if (sus === 'paused') doUse = 'paused'
            else if (sus === 'non_renewing') doUse = 'nonRenewing'
            else if (sus === 'active') doUse = 'active'
            else if (sus === 'in_trial') doUse = 'inTrial'
            else if (sus === 'future') doUse = 'future'
            return {
                value: doUse,
                text: this.$t('states.' + doUse)
            }
        },

        sub () {
            return this.$store.getters['auth/sub']
        },

        premium () {
            return this.$store.getters['auth/premium']
        }

    },

    mounted () {
        /* eslint-disable no-undef */
        var vm = this
        if (!document.getElementById('chargebee_js_script')) {
            var script = document.createElement('script')
            script.id = 'chargebee_js_script'
            script.src = 'https://js.chargebee.com/v2/chargebee.js'
            script.async = true

            script.onload = function () {
                Chargebee.init({ site: 'osis-fit-test' })
                vm.cbi = Chargebee.getInstance()
                vm.loadingScript = false
                if (vm.sub.id) vm.setSession()
            }

            document.getElementsByTagName('head')[0].appendChild(script)
        } else {
            vm.cbi = Chargebee.getInstance()
            vm.loadingScript = false
            if (vm.sub.id) vm.setSession()
        }
        /* eslint-enable no-undef */
    },

    methods: {

        setSession () {
            this.cbi.setPortalSession(function () {
                return Apios.get('subscription/portal/').then((res) => res.data.items)
            })
            this.portal = this.cbi.createChargebeePortal()
        },

        openPortal () {
            var vm = this
            vm.portal.open({
                close () {
                    vm.$store.dispatch('auth/refresh')
                },
                error: function (error) {
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.default'), text: error })
                }
            })
        },

        openCheckout () {
            var vm = this
            vm.cbi.openCheckout({
                hostedPage: () => {
                    return Apios.get('subscription/checkout/').then((res) => res.data.items)
                },
                success: function (hostedPageId) {
                    Apios.post('subscription/apply/', {
                        token: hostedPageId
                    }).then(res => {
                        vm.$store.dispatch('auth/refresh')
                    })
                },
                error: function (error) {
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.default'), text: error })
                }
            })
        }

    },

    i18n: {
        messages: {
            en: {
                youDontHave: "You don't have a subscription yet",
                btnEdit: 'Manage Subscription',
                btnGet: 'Get Premium',
                title: 'Premium',
                subsNr: 'Subscription ID',
                plan: 'Plan ID',
                state: 'Status',
                expiresOn: 'Expires on',
                renewsOn: 'Will be renewed on',
                states: {
                    future: 'Scheduled Start',
                    inTrial: 'Trial',
                    active: 'Active',
                    nonRenewing: 'Non renewing',
                    paused: 'Paused',
                    cancelled: 'Cancelled',
                    nonExisting: 'Not subscribed'
                }
            },
            de: {
                youDontHave: 'Du hast noch kein Abonnement',
                btnEdit: 'Abonnement verwalten',
                btnGet: 'Premium abbonieren',
                title: 'Premium',
                subsNr: 'Abonnement ID',
                plan: 'Plan ID',
                state: 'Status',
                expiresOn: 'Läuft ab am',
                renewsOn: 'Erneuert sich am',
                states: {
                    future: 'Geplanter Start',
                    inTrial: 'Testversion',
                    active: 'Aktiv',
                    nonRenewing: 'Nicht verlängernd',
                    paused: 'Pausiert',
                    cancelled: 'Storniert',
                    nonExisting: 'Nicht abonniert'
                }
            }
        }
    }

}
</script>
