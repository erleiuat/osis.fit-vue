<template>
    <v-layout row justify-center>

        <v-flex xs12 text-center>
            <div class="display-3 pb-5">Login</div>
        </v-flex>

        <v-flex xs8 text-center v-if="$route.query.verified">
            <v-alert outlined dense type="success">
                {{ $t('verified') }}
            </v-alert>
        </v-flex>

        <v-flex xs8>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                <v-text-field :label="$t('ft.mail')" v-model="fd.mail" :rules="rule.mail" type="email" solo />
                <v-text-field :label="$t('ft.password')" v-model="fd.password" :rules="rule.password" type="password" solo />

                <v-btn @click="login()" :loading="sending" color="primary" depressed large block type="submit">
                    {{ $t('btn.login') }}
                </v-btn>

                <v-divider class="pb-4" />

                <v-btn depressed block :to="{name: 'auth.register'}">
                    {{ $t('noAccount') }}
                </v-btn>

            </v-form>
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

            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('auth/login', this.fd).then(r => {
                this.$router.push({ name: 'auth', query: { target: this.$route.query.target } })
            }).catch(r => {
                switch (r) {
                    case 'password_wrong':
                        this.$notify({ type: 'error', text: vm.$t('wrong.pass') })
                        break
                    case 'account_not_found':
                        this.$notify({ type: 'error', text: vm.$t('wrong.mail') })
                        break
                    case 'mail_not_verified':
                        this.$notify({ type: 'error', text: vm.$t('wrong.verify') })
                        break
                }
            }).finally(() => {
                this.sending = false
            })

        }

    },

    mounted () {
        this.fd.mail = this.$route.query.mail || ''
    },

    i18n: {
        messages: {
            en: {
                title: 'Welcome!',
                verified: 'Your account is ready!',
                noAccount: "You don't have an account?",
                wrong: {
                    mail: 'Mail not found',
                    pass: 'Password incorrect',
                    verify: 'Account not verified',
                    default: 'Login failed'
                }
            },
            de: {
                title: 'Willkommen!',
                verified: 'Dein Konto ist nun bereit!',
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
