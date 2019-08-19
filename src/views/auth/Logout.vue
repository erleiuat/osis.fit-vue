<template>
    <vcontainer align="center">

        <v-row justify="center" align="end" style="height: 200px">
            <v-col cols="auto" v-if="!doing">
                <div class="headline pb-5">{{ $t('text') }}</div>
            </v-col>
            <v-col cols="auto" v-else>
                <div class="body-1 pb-5">{{ $t('pleaseWait') }}</div>
                <div class="headline pb-3">{{ $t('nextTime') }}</div>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="6" md="3">
                <v-btn @click="logout()" block color="primary" depressed>
                    {{ $t('sure') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-btn @click="$router.go(-1)" block depressed>
                    {{ $t('btn.cancel') }}
                </v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-progress-linear :indeterminate="doing" :color="prgcol" height="20" />
            </v-col>
        </v-row>

    </vcontainer>
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
                vm.$store.dispatch('logout').then(r => {
                    vm.prgcol = 'success'
                }).catch(r => {
                    vm.prgcol = 'error'
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.default'), text: r })
                }).finally(() => {
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
