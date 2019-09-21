<template>
    <vcontainer align="space-evenly">

        <v-row justify="space-around">
            <v-col cols="12" class="text-center">
                <div class="display-3">{{ $t('login') }}</div>
            </v-col>
            <v-col cols="12" md="6" v-if="$route.query.verified">
                <v-alert outlined dense type="success">
                    {{ $t('verified') }}
                </v-alert>
            </v-col>
        </v-row>

        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-row justify="center" dense>
                <v-col cols="12" md="6">
                    <v-text-field v-model="fd.identifier" :label="$t('ft.identifier')" :rules="rule.require" type="text" filled rounded single-line />
                    <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.require" type="password" filled rounded single-line />
                    <v-btn @click="login()" :loading="sending" color="primary" depressed large block type="submit">
                        {{ $t('login') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-row justify="center">
            <v-col cols="12">
                <v-divider />
            </v-col>
            <v-col cols="12" sm="6">
                <v-btn :to="{name: 'auth.forgotten'}" depressed small block>
                    {{ $t('noPassword') }}
                </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
                <v-btn :to="{name: 'auth.register'}" depressed small block>
                    {{ $t('noAccount') }}
                </v-btn>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            sending: false,
            fd: {
                identifier: '',
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

        checkLogin () {
            this.$store.dispatch('auth/verifyLogin', this.fd).then(r => {
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target })
                else this.$router.push({ name: 'dashboard' })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
            }).finally(() => {
                this.sending = false
            })
        },

        login () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('auth/login', this.fd).then(r => {
                // this.checkLogin()
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target })
                else this.$router.push({ name: 'dashboard' })
            }).catch(r => {
                this.sending = false
                switch (r) {
                case 'password_wrong':
                    this.$notify({ type: 'error', title: this.$t('fail.pass'), text: r })
                    break
                case 'account_not_found':
                    this.$notify({ type: 'error', title: this.$t('fail.unknown'), text: r })
                    break
                case 'account_not_verified':
                    this.$router.push({ name: 'auth.verify', query: { v: true } })
                    this.$notify({ type: 'error', title: this.$t('fail.verify'), text: r })
                    break
                default:
                    this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
                    break
                }
            })
        }

    },

    mounted () {
        if (this.$route.query.mail) this.fd.identifier = this.$route.query.mail
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
                    verify: 'Account not verified'
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
                    verify: 'Konto noch nicht verifiziert'
                }
            }
        }
    }

}
</script>
