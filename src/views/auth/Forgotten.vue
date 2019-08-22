<template>
    <vcontainer align="center">

        <v-row justify="center">
            <v-col cols="12" sm="8">
                <div class="display-1">{{ $t('title') }}</div>
                <div v-html="$t('text')" v-if="state === 'forgot'">
                </div>
            </v-col>
            <v-col cols="12" sm="8" v-if="state === 'sent'">
                <v-alert outlined type="success">
                    {{ $t('sent') }}
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
                <v-col cols="12" sm="7" md="4">
                    <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.password" type="password" filled rounded single-line />
                </v-col>
                <v-col cols="12" sm="7" md="4">
                    <v-text-field v-model="pwRepeat" :label="$t('repeat')" :rules="rule.repeat" type="password" filled rounded single-line />
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
import Apios from '@/plugins/Apios'

export default {
    name: 'Forgotten',

    data () {
        return {
            state: 'forgot',
            sending: false,
            pwRepeat: '',
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
                ],
                repeat: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v === this.fd.password || this.$t('alert.v.notSame')
                ]
            }
        }
    },

    methods: {

        send () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            Apios.post('auth/password/forgotten/', this.fd).then(res => {
                this.state = 'sent'
            }).finally(() => {
                this.sending = false
            })

        },

        reset () {
            if (!this.$refs.form.validate()) return false
            this.sending = true
            this.$store.dispatch('forgot', this.fd).then(r => {
                this.$router.push({ name: 'auth.login' })
                this.$notify({ type: 'error', title: this.$t('hasChanged') })
            }).catch(r => { }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.query.mail && this.$route.query.code) {
            this.state = 'reset'
            this.fd.mail = this.$route.query.mail
            this.fd.code = this.$route.query.code
            this.$router.push({ name: 'auth.forgotten', query: { reset: true } })
        }
    },

    i18n: {
        messages: {
            en: {
                title: 'Reset password',
                password: 'Password',
                repeat: 'Repeat Password',
                hasChanged: 'Password has been changed',
                text: `
                    If you have forgotten your password, you can request a reset link here. 
                    The link will then be sent to you by email.
                `,
                sent: `
                    If an account is registered with this email, 
                    the password reset link has just been sent.
                `
            },
            de: {
                title: 'Passwort zurücksetzen',
                password: 'Passwort',
                repeat: 'Passwort wiederholen',
                hasChanged: 'Passwort wurde geändert',
                text: `
                    Falls du dein Passwort vergessen hast, kannst du hier 
                    einen Link zum Zurücksetzen anfordern. Der Link wird anschliessend
                    per E-Mail an dich versendet.
                `,
                sent: `
                    Falls unter dieser E-Mail ein Konto registriert ist, 
                    wurde der Link zum Zurücksetzen des Passworts soeben verschickt.
                `
            }
        }
    }

}
</script>
