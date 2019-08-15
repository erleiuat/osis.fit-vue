<template>
    <v-container grid-list-xl>
        <v-layout row wrap justify-space-around>

            <v-flex xs12 sm8 v-if="!doing" text-center style="height: 150px">
                <div class="headline pb-5">{{ $t('text') }}</div>
                <v-layout row wrap justify-space-around>
                    <v-flex xs12 sm6>
                        <v-btn @click="logout()" block color="primary" depressed>
                            {{ $t('sure') }}
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-btn @click="$router.go(-1)" block depressed>
                            {{ $t('btn.cancel') }}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-else text-center style="height: 150px">
                <div class="headline pb-3">{{ $t('nextTime') }}</div>
                <div class="body-1 pb-5">{{ $t('pleaseWait') }}</div>
            </v-flex>

            <v-flex xs12 sm8>
                <v-progress-linear :indeterminate="doing" :color="prgcol" height="20" />
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import { setTimeout } from 'timers'

export default {
    name: 'Logout',

    data () {
        return {
            doing: false,
            prgcol: 'primary'
        }
    },

    methods: {

        logout () {
            var vm = this
            vm.doing = true
            setTimeout(function () {
                vm.$store.dispatch('auth/logout').then(r => {
                    vm.prgcol = 'success'
                }).catch(r => {
                    vm.prgcol = 'error'
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.default'), text: r })
                }).finally(() => {
                    vm.$store.removeModules()
                    vm.$router.push({ name: 'auth' })
                })
            }, 1000)
        }

    },

    i18n: {
        messages: {
            en: {
                text: 'Are you sure?',
                sure: 'Logout now',
                pleaseWait: "You're about to be logged off...",
                nextTime: 'Till next time!'
            },
            de: {
                text: 'Bist du dir sicher?',
                sure: 'Jetzt abmelden',
                pleaseWait: 'Du wirst gleich abgemeldet...',
                nextTime: 'Bis zum nächsten mal!'
            }
        }
    }

}
</script>
