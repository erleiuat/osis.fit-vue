<template>
    <v-layout row wrap justify-space-around align-content-start>

        <v-flex xs12 sm10>
            <div class="display-2">{{ $t('thanks') }}</div>
            <div v-html="$t('text')">
            </div>
        </v-flex>

        <v-flex xs12 sm8 md6 lg5>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                <v-text-field :label="$t('ft.mail')" v-model="fd.mail" :rules="rule.mail" type="email" />
                <v-text-field :label="$t('ft.code')" v-model="fd.code" :rules="rule.code" type="number" />
                <v-btn @click="verify()" color="primary" block type="submit" :disabled="sending" :loading="sending">
                    {{ $t('btn.send') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-form>
        </v-flex>

    </v-layout>
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
                ],
                code: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length > 9 || this.$t('alert.v.tooShort', { amount: 10 }),
                    v => v.length < 11 || this.$t('alert.v.tooLong', { amount: 10 })
                ]
            }
        }
    },

    methods: {

        verify () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('auth/verify/', vm.fd).then(function (response) {
                vm.$router.push({ name: 'auth.login', query: { mail: vm.fd.mail, verified: true } })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.default') })
            }).finally(function () {
                vm.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.query.mail && this.$route.query.code) {
            this.fd.mail = this.$route.query.mail
            this.fd.code = this.$route.query.code
            this.verify()
        } else if (this.$route.query.mail) this.fd.mail = this.$route.query.mail
    },

    i18n: {
        messages: {
            en: {
                thanks: 'Thank you',
                text: `
                    Your registration was processed successfully. 
                    To activate your account you only have to confirm your <b>E-Mail address</b>, 
                    to which we have sent you a link. Check your inbox and use the code from our mail 
                    to complete the registration process (also check your spam folder).
                `
            },
            de: {
                thanks: 'Vielen Dank',
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
