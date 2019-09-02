<template>
    <vcontainer align="center">

        <v-row justify="center">
            <v-col cols="12" sm="8">
                <div class="display-1">{{ $t('title') }}</div>
                <div v-html="$t('text')" v-if="state === 'forgot'" />
                <div v-html="$t('resetText')" v-if="state === 'reset'" />
            </v-col>
            <v-col cols="12" sm="8" v-if="state === 'sent'">
                <v-alert outlined type="success" class="body-2">
                    <div v-html="$t('sent')"></div>
                </v-alert>
            </v-col>
        </v-row>

        <v-form v-if="state === 'forgot'" v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-row justify="center" align="baseline">
                <v-col cols="12" sm="8">
                    <v-text-field v-model="fd.identifier" :label="$t('ft.identifier')" :rules="rule.require" type="text" filled rounded single-line />
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" sm="4">
                    <v-btn @click="send()" :loading="sending" color="primary" depressed block type="submit">
                        {{ $t('btn.send') }}
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-btn depressed block :to="{name: 'auth.login'}">
                        {{ $t('btn.cancel') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-form v-if="state === 'reset'" v-model="rule.valid" ref="form" v-on:submit.prevent>
            <v-row dense justify="center">
                <v-col cols="12" sm="7">
                    <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.password" :type="showPW ? 'text' : 'password'" :append-icon="showPW ? 'visibility' : 'visibility_off'" @click:append="showPW = !showPW" filled rounded single-line />
                </v-col>
                <v-col cols="12" sm="7">
                    <v-btn @click="reset()" :loading="sending" color="primary" depressed large block type="submit">
                        {{ $t('btn.send') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

    </vcontainer>

</template>

<script>
import account from '@/store/modules/account'
import Apios from '@/plugins/Apios'

export default {
    name: 'Forgotten',
    modules: {
        account
    },

    data () {
        return {
            state: 'forgot',
            showPW: false,
            sending: false,
            fd: {
                identifier: '',
                language: this.$store.state.app.lang || null,
                code: '',
                password: ''
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
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

        send () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            Apios.post('auth/password/forgotten/', this.fd).then(res => { // TODO: Put in module
            }).finally(() => {
                this.state = 'sent'
                this.sending = false
            })
        },

        reset () {
            if (!this.$refs.form.validate()) return false
            this.sending = true
            this.$store.dispatch('account/forgot2', this.fd).then(r => {
                this.$router.push({ name: 'auth.login' })
                this.$notify({ type: 'success', title: this.$t('hasChanged') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    beforeMount () {
        if (this.$route.query.mail && this.$route.query.code) {
            this.fd.identifier = this.$route.query.mail
            this.fd.code = this.$route.query.code
            this.state = 'reset'
        }
    },

    i18n: {
        messages: {
            en: {
                title: 'Reset password',
                password: 'New Password',
                repeat: 'Repeat Password',
                hasChanged: 'Your password has been changed. You can sing in using your new password now.',
                strong: 'New password is not strong enough',
                resetText: 'Enter your new password:',
                text: `
                    If you have forgotten your password, you can request a reset link here. 
                    The link will then be sent to you by email.
                `,
                sent: `
                    If there is an account with these credentials, the password-reset link has just been sent.
                    It may take a few minutes before you receive the email. Also check your spam folder. 
                    If you still haven't received the code after 10 minutes, <a to="/help/contact">please contact support</a>.
                `
            },
            de: {
                title: 'Passwort zurücksetzen',
                password: 'Neues Passwort',
                repeat: 'Passwort wiederholen',
                hasChanged: 'Dein Passwort wurde geändert. Du kannst dich nun mit dem neuen Passwort anmelden.',
                strong: 'Das neue Password ist nicht stark genug',
                resetText: 'Gebe hier dein neues Passwort ein:',
                text: `
                    Falls du dein Passwort vergessen hast, kannst du hier 
                    einen Link zum Zurücksetzen anfordern. Der Link wird anschliessend
                    per E-Mail an dich versendet.
                `,
                sent: `
                    Falls ein Konto unter deinen Angaben existert, wurde der Link zum Zurücksetzen des Passworts soeben verschickt.
                    Es kann einige Minuten dauern, bis du die E-Mail erhälst. Überprüfe auch deinen Spam-Ordner. 
                    Hast du den Code nach 10 Minuten noch immer nicht erhalten, <a to="/help/contact">kontaktiere bitte den Support</a>.
                `
            }
        }
    }

}
</script>
