<template>
    <vcontainer align="center">
        <v-row justify="center">

            <v-col cols="12" md="8">
                <div class="display-1">{{ $t('thanks') }}</div>
                <div v-html="$t('text')">
                </div>
            </v-col>

            <v-col cols="12" md="8" v-if="$route.query.mail">
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <v-text-field v-model="fd.mail" :label="$t('ft.mail')" :rules="rule.mail" type="email" />
                    <v-text-field v-model="fd.code" :label="$t('code')" :rules="rule.code" type="text" />
                    <v-btn @click="verify()" :loading="sending" color="primary" depressed large block type="submit">
                        {{ $t('btn.send') }}
                    </v-btn>
                </v-form>
            </v-col>

        </v-row>
    </vcontainer>
</template>

<script>
export default {
    name: 'Verify',

    data () {
        return {
            sending: false,
            fd: {
                mail: '',
                code: ''
            },
            rule: {
                valid: false,
                mail: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.v.invalid'),
                    v => v.length < 90 || this.$t('alert.v.tooLong', { amount: 90 })
                ]
            }
        }
    },

    methods: {

        verify (force = false) {
            if (!this.$refs.form.validate() && !force) return false

            this.sending = true
            this.$store.dispatch('verify', this.fd).then(r => {
                this.$router.push({ name: 'auth.login', query: { mail: this.fd.mail, verified: true } })
            }).catch(r => {
                switch (r) {
                case 'code_wrong':
                    this.$notify({ type: 'error', title: this.$t('fail.code') })
                    break
                case 'account_already_verified':
                    this.$notify({ type: 'error', title: this.$t('fail.already') })
                    break
                default:
                    this.$notify({ type: 'error', title: this.$t('alert.error.default') })
                    break
                }
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.query.mail) this.fd.mail = this.$route.query.mail
        if (this.$route.query.code) this.fd.code = this.$route.query.code
        if (this.$route.query.mail && this.$route.query.code) this.verify(true)
    },

    i18n: {
        messages: {
            en: {
                thanks: 'Thank you',
                code: 'Code',
                fail: {
                    code: 'Code is invalid',
                    already: 'Account is verified'
                },
                text: `
                    Your registration was processed successfully. 
                    To activate your account you only have to confirm your <b>E-Mail address</b>, 
                    to which we have sent you a link. Check your inbox and use the code from our mail 
                    to complete the registration process (also check your spam folder).
                `
            },
            de: {
                thanks: 'Vielen Dank',
                code: 'Code',
                fail: {
                    code: 'Ungültiger Code',
                    already: 'Konto bereits verifiziert'
                },
                text: `
                    Deine Registrierung wurde erfolgreich verarbeitet.
                    Um dein Konto zu aktivieren musst du nur noch deine <b>E-Mail Adresse bestätigen</b>,
                    wozu wir dir einen Link gesendet haben. Überprüfe deinen Posteingang und nutze den
                    Code aus unserer Mail, um die Registrierung abzuschiessen (Überprüfe auch den Spam-Ordner).
                `
            }
        }
    }

}
</script>
