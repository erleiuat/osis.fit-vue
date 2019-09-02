<template>
    <vcontainer align="center">

        <v-row justify="center" v-if="state === 'notice'">
            <v-col cols="12" md="8">
                <div class="display-1">{{ $t('thanks') }}</div>
                <div v-html="$t('text')" />
            </v-col>
            <v-col cols="12" class="text-center">
                <v-icon x-large>mail_outline</v-icon>
            </v-col>
        </v-row>

        <v-row justify="center" align="center" v-if="state === 'auto' || sending">
            <v-col cols="12" class="text-center">
                <div class="title">{{ $t('autoVerify') }}</div>
            </v-col>
            <v-col cols="12" class="text-center" v-if="sending">
                <v-progress-circular :size="50" color="primary" indeterminate />
            </v-col>
        </v-row>

        <v-row justify="center" v-if="state === 'verify' && !sending">
            <v-col cols="12" md="8">
                <div class="display-1">{{ $t('verify') }}</div>
                <div v-html="$t('textVerify')" />
            </v-col>
            <v-col cols="12" md="8" v-if="state === 'verify'">
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
import account from '@/store/modules/account'

export default {
    name: 'Verify',
    modules: {
        account
    },

    data () {
        return {
            state: 'notice',
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
            if (!force && !this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('account/verify', this.fd).then(r => {
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
                    this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
                    break
                }
                this.state = 'verify'
            }).finally(() => {
                this.sending = false
            })
        }

    },

    beforeMount () {
        var qry = this.$route.query
        if (qry.mail || qry.code || qry.v) {
            if (qry.mail) this.fd.mail = qry.mail
            if (qry.code) this.fd.code = qry.code
            if (qry.mail && qry.code) {
                this.state = 'auto'
                this.verify(true)
            } else this.state = 'verify'
        }
    },

    i18n: {
        messages: {
            en: {
                thanks: 'Thank you',
                verify: 'Verification',
                autoVerify: 'Verification in progress',
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
                `,
                textVerify: `
                    Verify your account to log in. <br/>
                    You should have received an e-mail with a link. Can't find the e-mail? 
                    It may take a few minutes before you receive the email. Also check your spam folder. 
                    If you still haven't received the code after 10 minutes, <a to="/help/contact">please contact support</a>.
                `
            },
            de: {
                thanks: 'Vielen Dank',
                verify: 'Verifizierung',
                autoVerify: 'Verifizierung läuft',
                code: 'Code',
                fail: {
                    code: 'Ungültiger Code',
                    already: 'Konto bereits verifiziert'
                },
                text: `
                    Deine Registrierung wurde erfolgreich verarbeitet. <br/>
                    Um dein Konto zu aktivieren musst du nur noch deine <b>E-Mail Adresse bestätigen</b>,
                    wozu wir dir einen Link gesendet haben. Überprüfe deinen Posteingang und nutze den
                    Code aus unserer Mail, um die Registrierung abzuschiessen (Überprüfe auch den Spam-Ordner).
                `,
                textVerify: `
                    Verifiziere dein Konto um dich anzumelden. <br/>
                    Du solltest dazu eine E-Mail mit einem Link erhalten haben. Findest du die E-Mail nicht? 
                    Es kann einige Minuten dauern, bis du die E-Mail erhälst. Überprüfe auch deinen Spam-Ordner. 
                    Hast du den Code nach 10 Minuten noch immer nicht erhalten, <a to="/help/contact">kontaktiere bitte den Support</a>.
                `
            }
        }
    }

}
</script>
