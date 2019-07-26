<template>
    <v-layout row wrap justify-space-around align-content-center>

        <v-flex xs12 text-xs-center>
            <div class="display-1" v-if="!$route.query.verified">{{ $t('title') }}</div>
            <div class="display-4">Osis.fit</div>
        </v-flex>

        <transition appear name="fade">
            <v-flex xs12 sm8 md7 v-if="$route.query.verified" text-xs-center>
                <v-alert outline :value="true" type="success">
                    <div class="title">{{ $t('verified') }}</div>
                </v-alert>
            </v-flex>
        </transition>

        <v-flex xs12 sm8 md7>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                <v-text-field :label="$t('ft.mail')" v-model="fd.mail" :rules="rule.mail" type="email" solo />
                <v-text-field :label="$t('ft.password')" v-model="fd.password" :rules="rule.password" type="password" solo />
                <v-btn @click="login()" type="submit" :disabled="sending" :loading="sending" class="accent" depressed block>
                    {{ $t('btn.login') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-form>
        </v-flex>

        <v-flex xs12 sm8 md6>
            <v-divider class="pb-4" />
            <v-btn depressed block :to="{name: 'auth.register'}">
                {{ $t('noAccount') }}
            </v-btn>
        </v-flex>

    </v-layout>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            sending: false,
            fd: {
                mail: '',
                password: ''
            },
            rule: {
                valid: false,
                mail: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.v.invalid'),
                    v => v.length < 90 || this.$t('alert.v.tooLong', { amount: 90 })
                ],
                password: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length > 7 || this.$t('alert.v.tooShort', { amount: 8 }),
                    v => v.length < 255 || this.$t('alert.v.tooLong', { amount: 255 })
                ]
            }
        }
    },

    methods: {

        login () {
            var vm = this
            vm.sending = true
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            var target = vm.$route.query.target || false

            vm.$http.post('auth/', vm.fd).then(function (r) {
                var exp = new Date(r.data.auth.expire * 1000)
                vm.$cookies.set('app_token', r.data.auth.token, exp)
                vm.$router.push({ name: 'auth', query: { target: target } })
            }).catch(function (e) {
                if (e.response.data._info) switch (e.response.data._info) {
                case 'password_incorrect':
                    vm.fd.password = ''
                    vm.$notify({ type: 'error', text: vm.$t('wrong.pass') })
                    break
                case 'mail_not_found':
                    vm.$notify({ type: 'error', text: vm.$t('wrong.mail') })
                    break
                case 'mail_not_verified':
                    vm.$router.push({ name: 'auth.verify', query: { mail: vm.fd.mail } })
                    vm.$notify({ type: 'error', text: vm.$t('wrong.verify') })
                    break
                default:
                    vm.$notify({ type: 'error', text: vm.$t('wrong.default') })
                    break
                }
                else vm.$notify({ type: 'error', text: vm.$t('wrong.default') })
            }).finally(function () {
                vm.sending = false
            })
        }

    },

    mounted () {
        this.fd.mail = this.$route.query.mail || ''
    },

    i18n: {
        messages: {
            en: {
                verified: 'Your account is ready!',
                title: 'Welcome!',
                noAccount: "You don't have an account?",
                wrong: {
                    mail: 'Mail not found',
                    pass: 'Password incorrect',
                    verify: 'Account not verified',
                    default: 'Login failed'
                }
            },
            de: {
                verified: 'Dein Konto ist nun bereit!',
                title: 'Willkommen!',
                noAccount: 'Hast du noch kein Konto?',
                wrong: {
                    mail: 'Mail nicht gefunden',
                    pass: 'Falsches Passwort',
                    verify: 'Konto noch nicht verifiziert',
                    default: 'Anmeldung fehlgeschlagen'
                }
            }
        }
    }

}
</script>
