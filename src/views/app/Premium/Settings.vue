<template>
    <v-container grid-list-xl>
        <v-layout wrap>
            <v-flex xs12>
                <div class="display-1">
                    {{ $t('title') }}
                </div>
            </v-flex>
            <v-flex xs12>
                Premium verwalten
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <v-btn :loading="loadingScript" color="primary" block @click="openPortal()">
                {{ $t('getPremium') }}
            </v-btn>
        </v-layout>

    </v-container>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Settings',

    data () {
        return {
            cbi: null,
            portal: null,
            loadingScript: true
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
            });
            this.portal = this.cbi.createChargebeePortal();
        },

        openPortal () {
            var vm = this
            vm.portal.open({
                close () {
                    vm.$store.dispatch('auth/refresh')
                }
            });
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Premium Settings'
            },
            de: {
                title: 'Premium Einstellungen'
            }
        }
    }

}
</script>
