<template>
    <v-card flat :color="premium ? '' : 'yellow lighten-3'">

        <v-card-title>
            <h3 class="display-2">{{ $t('title') }}</h3>
        </v-card-title>

        <v-card-text>
            <v-layout row wrap overflow-hidden>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('subsNr') }}</span><br />
                    <span class="headline">{{ sub.id || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('plan') }}</span><br />
                    <span class="headline">{{ sub.plan || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('state') }}</span><br />
                    <span class="headline">{{ sub.status ? sub.status : $t('inactive') }}</span>
                </v-flex>
            </v-layout>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="openPortal()" :loading="loadingScript" depressed v-if="premium">
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

        sub () {
            return this.$store.getters['auth/subscription']
        },

        premium () {
            return this.$store.getters['auth/premium']
        }

    },

    mounted () {
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
                if (vm.premium) vm.setSession()
            }

            document.getElementsByTagName('head')[0].appendChild(script)
        } else {
            vm.cbi = Chargebee.getInstance()
            vm.loadingScript = false
            if (vm.premium) vm.setSession()
        }
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
                        vm.$router.push({ name: 'dashboard' })
                    })
                },
                error: function (error) {
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.save'), text: error })
                }
            })
        }

    },

    i18n: {
        messages: {
            en: {
                btnEdit: 'Manage Subscription',
                btnGet: 'Get Premium',
                title: 'Premium',
                subsNr: 'Subscription ID',
                plan: 'Plan ID',
                state: 'Status',
                active: 'Active',
                inactive: 'Not active'
            },
            de: {
                btnEdit: 'Abonnement verwalten',
                btnGet: 'Premium abbonieren',
                title: 'Premium',
                subsNr: 'Abonnement ID',
                plan: 'Plan ID',
                state: 'Status',
                active: 'Aktiv',
                inactive: 'Nicht aktiv'
            }
        }
    }

}
</script>
