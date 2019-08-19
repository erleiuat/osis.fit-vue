<template>
    <vcontainer align="center">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent fill-height>
            <v-row dense justify="center">

                <v-col cols="12">
                    <div class="display-1 text-center">
                        {{ $t('title') }}
                    </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fd.firstname" :label="$t('ft.firstname')" :rules="rule.name" type="text" outlined single-line />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="fd.lastname" :label="$t('ft.lastname')" :rules="rule.name" type="text" outlined single-line />
                </v-col>

                <v-col cols="12" md="8">
                    <v-text-field v-model="fd.mail" :label="$t('ft.mail')" :rules="rule.mail" type="email" outlined single-line />
                </v-col>

                <v-col cols="12" md="8">
                    <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.password" :type="showPW ? 'text' : 'password'" :append-icon="showPW ? 'visibility' : 'visibility_off'" @click:append="showPW = !showPW" outlined single-line />
                </v-col>

            </v-row>
            <v-row dense justify="center">
                <v-col cols="12" sm="6">
                    <v-btn @click="register()" :loading="sending" color="primary" depressed large block type="submit">
                        {{ $t('register') }}
                    </v-btn>
                </v-col>

                <v-col cols="8">
                    <v-divider />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn :to="{name: 'auth.login'}" small depressed block>
                        {{ $t('orLogin') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </vcontainer>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            showPW: false,
            sending: false,
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
                ]
            }
        }
    },

    methods: {

        register () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('register', this.fd).then(r => {
                this.$router.push({ name: 'auth.verify', query: { mail: this.fd.mail } })
            }).catch(r => {
                if (r === 'mail_in_use') this.$notify({ type: 'error', title: this.$t('mailInUse') })
                else this.$notify({ type: 'error', title: this.$t('alert.error.default') })
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
