<template>
    <v-layout row wrap justify-space-around align-content-start>

        <v-flex xs12 sm10>
            <div class="display-2 pb-4">{{ $t('title') }}</div>
        </v-flex>

        <v-flex xs12 sm8>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                <v-text-field :label="$t('ft.firstname')" v-model="fd.firstname" :rules="rule.name" type="text" solo />
                <v-text-field :label="$t('ft.lastname')" v-model="fd.lastname" :rules="rule.name" type="text" solo />
                <v-text-field :label="$t('ft.mail')" v-model="fd.mail" :rules="rule.mail" type="email" solo />
                <v-text-field :label="$t('ft.password')" v-model="fd.password" :rules="rule.password" type="password" solo />
                <v-text-field :label="$t('ft.repeat')" v-model="pwRepeat" :rules="rule.repeat" type="password" solo />
                <v-btn @click="register()" type="submit" :disabled="sending" :loading="sending" class="accent" depressed block>
                    {{ $t('btn.register') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-form>
        </v-flex>

        <v-flex xs12 sm8>
            <v-divider class="pb-4" />
            <v-btn depressed block :to="{name: 'auth.login'}">
                {{ $t('orLogin') }}
            </v-btn>
        </v-flex>

    </v-layout>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            sending: false,
            pwRepeat: '',
            fd: {
                firstname: '',
                lastname: '',
                mail: '',
                password: '',
                language: this.$store.state.app.language
            },
            rule: {
                valid: false,
                name: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length < 150 || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                mail: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.v.invalid'),
                    v => v.length < 90 || this.$t('alert.v.tooLong', { amount: 90 })
                ],
                password: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) || this.$t('strong'),
                    v => v.length < 255 || this.$t('alert.v.tooLong', { amount: 255 })
                ],
                repeat: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v === this.fd.password || this.$t('alert.v.notSame')
                ]
            }
        }
    },

    methods: {

        register () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('auth/register/', vm.fd).then(function (response) {
                vm.$router.push({ name: 'auth.verify', query: { mail: vm.fd.mail } })
            }).catch(function (e) {
                if (e.response.data._info) switch (e.response.data._info) {
                case 'mail_in_use':
                    vm.fd.mail = ''
                    vm.$notify({ type: 'error', text: vm.$t('mailInUse') })
                    break
                default:
                    vm.$notify({ type: 'error', text: vm.$t('somethingWrong') })
                    break
                }
                else vm.$notify({ type: 'error', text: vm.$t('somethingWrong') })
            }).finally(function () {
                vm.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                orLogin: 'Already registered?',
                title: 'Create your Account',
                mailInUse: 'This Mail is already in use',
                somethingWrong: 'Something went wrong. Please contact Support.',
                strong: 'This password is not strong enough'
            },
            de: {
                orLogin: 'Bereits registriert?',
                title: 'Erstelle ein neues Konto',
                mailInUse: 'Diese Mail ist bereits registriert',
                somethingWrong: 'Etwas lief falsch. Bitte kontaktiere den Support.',
                strong: 'Dieses Password ist nicht stark genug'
            }
        }
    }

}
</script>
