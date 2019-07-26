<template>
    <v-layout row wrap justify-space-around align-content-center>
        <v-flex xs12 sm1>
            <v-icon :class="loading?'spinning-loader':'d-none'" x-large>
                cached
            </v-icon>
        </v-flex>
        <v-flex xs12 sm10>
            <div class="headline pb-3">{{ $t('nextTime') }}</div>
            <div class="body-1 pb-5">{{ $t('pleaseWait') }}</div>
            <v-progress-linear indeterminate :color="prgcol" height="20" />
        </v-flex>
        <v-flex xs12 sm1>

        </v-flex>
    </v-layout>
</template>

<script>
import { setTimeout } from 'timers'

export default {
    name: 'Logout',

    data () {
        return {
            loading: false,
            prgcol: 'primary'
        }
    },

    mounted () {
        var vm = this

        setTimeout(function () {
            vm.prgcol = 'warning'
            vm.loading = true
            vm.logout()
        }, 2000)
    },

    methods: {

        logout () {
            var vm = this
            vm.$http.get('auth/logout/').then(function (response) {
                vm.prgcol = 'success'
            }).catch(function () {
                vm.prgcol = 'error'
                vm.$notify({ type: 'error', text: vm.$t('alert.error.default') })
            }).finally(function () {
                vm.loading = false
                vm.$store.commit('logout')
                vm.$cookies.remove('app_token')
                vm.$router.push({ name: 'auth' })
            })
        }

    },

    i18n: {
        messages: {
            en: {
                pleaseWait: "You're about to be logged off...",
                nextTime: 'Till next time!'
            },
            de: {
                pleaseWait: 'Du wirst gleich abgemeldet...',
                nextTime: 'Bis zum nächsten mal!'
            }
        }
    }

}
</script>
