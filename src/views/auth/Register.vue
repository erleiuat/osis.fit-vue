<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
        <v-layout row align-content-center fill-height>

            <v-flex xs12 text-center>
                <div class="display-2 pb-4">{{ $t('title') }}</div>
            </v-flex>

            <v-flex xs12>
                <v-text-field v-model="fd.firstname" :label="$t('ft.firstname')" :rules="rule.name" type="text" solo />
                <v-text-field v-model="fd.lastname" :label="$t('ft.lastname')" :rules="rule.name" type="text" solo />
                <v-text-field v-model="fd.mail" :label="$t('ft.mail')" :rules="rule.mail" type="email" solo />
            </v-flex>

            <v-flex xs6>
                <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.password" type="password" solo />
            </v-flex>
            <v-flex xs6>
                <v-text-field v-model="pwRepeat" :label="$t('repeat')" :rules="rule.repeat" type="password" solo />
            </v-flex>

            <v-flex xs12>
                <v-btn @click="register()" :loading="sending" color="primary" depressed large block type="submit">
                    {{ $t('register') }}
                </v-btn>
            </v-flex>

            <v-flex xs12>
                <v-divider />
            </v-flex>

            <v-flex xs12>
                <v-btn depressed block :to="{name: 'auth.login'}">
                    {{ $t('orLogin') }}
                </v-btn>
            </v-flex>

        </v-layout>
    </v-form>
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
                language: navigator.language || navigator.userLanguage
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
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('auth/register', this.fd).then(r => {
                this.$router.push({ name: 'auth.verify', query: { mail: this.fd.mail } })
            }).catch(r => {
                if (r === 'mail_in_use') this.$notify({ type: 'error', text: this.$t('mailInUse') })
                else this.$notify({ type: 'error', text: this.$t('alert.error.default') })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Create your Account',
                password: 'Password',
                repeat: 'Repeat Password',
                register: 'Register',
                orLogin: 'Already registered?',
                mailInUse: 'E-Mail Address already in use',
                strong: 'This password is not strong enough'
            },
            de: {
                title: 'Konto erstellen',
                password: 'Passwort',
                repeat: 'Passwort wiederholen',
                register: 'Registrieren',
                orLogin: 'Bereits registriert?',
                mailInUse: 'E-Mail Adresse bereits registriert',
                strong: 'Dieses Password ist nicht stark genug'
            }
        }
    }

}
</script>
