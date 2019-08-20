<template>
    <vcontainer align="center" style="min-height: 400px;">

        <v-row justify="center" dense v-if="sub.id">
            <v-col cols="12" sm="8" md="4">
                <span class="title">{{ $t('subsNr') }}</span><br />
                <span class="subheading">{{ sub.id }}</span>
            </v-col>
            <v-col cols="12" sm="8" md="4">
                <span class="title">{{ $t('plan') }}</span><br />
                <span class="subheading">{{ sub.plan }}</span>
            </v-col>
        </v-row>
        <v-row justify="center" dense v-if="sub.id">
            <v-col cols="12" sm="4">
                <span class="title">{{ $t('state') }}</span><br />
                <span class="subheading">{{ subStatus.text }}</span>
            </v-col>
            <v-col cols="12" sm="4">
                <span class="title">{{ subExpiry.title }}</span><br />
                <span class="subheading">{{ subExpiry.value }}</span>
            </v-col>
        </v-row>

        <v-row justify="center" dense v-else>
            <v-col cols="12" sm="4">
                {{ $t('youDontHave') }}
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-btn @click="openPortal()" v-if="sub.id" :loading="loadingScript" color="primary" block depressed>
                    {{ $t('btnEdit') }}
                </v-btn>
                <v-btn @click="openCheckout()" v-else :loading="loadingScript" color="primary" block depressed>
                    <strong>{{ $t('btnGet') }}</strong>
                </v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Premium',

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
            return this.$store.getters['sub']
        },

        premium () {
            return this.$store.getters['premium']
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
                Chargebee.init({ site: process.env.VUE_APP_CHARGEBEE_SITE })
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
                    vm.$store.dispatch('refreshAuth')
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
                        vm.$store.dispatch('refreshAuth')
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
