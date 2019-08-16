<template>
    <v-layout row justify-center>

        <v-flex xs12 text-center>
            <div class="display-3 pb-5">{{ $t('login') }}</div>
        </v-flex>

        <v-flex xs12 text-center v-if="$route.query.verified">
            <v-alert outlined dense type="success">
                {{ $t('verified') }}
            </v-alert>
        </v-flex>

        <v-flex xs12 sm10 md8 lg6>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

                <v-text-field v-model="fd.mail" :label="$t('ft.mail')" :rules="rule.require" type="email" solo />
                <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.require" type="password" solo />

                <v-btn @click="login()" :loading="sending" color="primary" depressed large block type="submit">
                    {{ $t('login') }}
                </v-btn>

            </v-form>
        </v-flex>

        <v-flex xs12>
            <v-divider />
        </v-flex>

        <v-flex xs12 sm6 md5>
            <v-btn depressed small block :to="{name: 'auth.forgotten'}">
                {{ $t('noPassword') }}
            </v-btn>
        </v-flex>

        <v-flex xs12 sm6 md5>
            <v-btn depressed small color="" block :to="{name: 'auth.register'}">
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
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    methods: {

        login () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('auth', this.fd).then(r => {
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target.name })
                else this.$router.push({ name: 'dashboard' })
            }).catch(r => {
                switch (r) {
                case 'password_wrong':
                    this.$notify({ type: 'error', title: this.$t('fail.pass'), text: r })
                    break
                case 'account_not_found':
                    this.$notify({ type: 'error', title: this.$t('fail.unknown'), text: r })
                    break
                case 'account_not_verified':
                    this.$notify({ type: 'error', title: this.$t('fail.verify'), text: r })
                    break
                default:
                    this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
                    break
                }
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.query.mail) this.fd.mail = this.$route.query.mail
    },

    i18n: {
        messages: {
            en: {
                login: 'Login',
                title: 'Welcome!',
                password: 'Password',
                verified: 'Your account is ready!',
                noAccount: "Don't you have an account yet?",
                noPassword: 'Lost your password?',
                fail: {
                    pass: 'Password incorrect',
                    unknown: 'Account not found',
                    verify: 'Account unverified'
                }
            },
            de: {
                login: 'Anmelden',
                title: 'Willkommen!',
                password: 'Passwort',
                verified: 'Dein Konto ist nun bereit!',
                noAccount: 'Hast du noch kein Konto?',
                noPassword: 'Passwort vergessen?',
                fail: {
                    pass: 'Falsches Passwort',
                    unknown: 'Konto nicht gefunden',
                    verify: 'Konto unverifiziert'
                }
            }
        }
    }

}
</script>
