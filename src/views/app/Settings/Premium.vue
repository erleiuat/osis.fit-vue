<template>
    <v-card flat>

        <v-card-title>
            <h3 class="display-2">{{ $t('title') }}</h3>
        </v-card-title>

        <v-card-text>
            <v-layout row wrap overflow-hidden>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('subsNr') }}</span><br />
                    <span class="headline">{{ subs.number || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('plan') }}</span><br />
                    <span class="headline">{{ subs.plan || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('state') }}</span><br />
                    <span class="headline">{{ subs.active ? $t('active') : $t('inactive') }}</span>
                </v-flex>
            </v-layout>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="openPortal()" depressed>{{ $t('btn.edit') }}</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Premium',

    data() {
        return {
            cbi: false
        }
    },

    computed: {
        
        subs(){
            var info = this.$store.getters['auth/billing']
            return {
                number: info.subscription,
                plan: info.plan,
                active: info.active
            }
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
                Chargebee.init({ site: 'osis-fit-test' })
                vm.cbi = Chargebee.getInstance()
                vm.loadingScript = false
                vm.setSession()
            }

            document.getElementsByTagName('head')[0].appendChild(script)
        } else {
            this.cbi = Chargebee.getInstance()
            this.loadingScript = false
            this.setSession()
        }
    },

    methods: {

        setSession () {
            this.cbi.setPortalSession(function () {
                return Apios.get('billing/premium/portal/').then((res) => res.data.items)
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
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Premium',
                subsNr: 'Subscription ID',
                plan: 'Plan ID',
                state: 'Status',
                active: 'Active',
                inactive: 'Not active'
            },
            de: {
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
