<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent fill-height>
        <vcontainer>
            <v-row dense justify="center">
                <v-col cols="12" md="7">
                    <v-text-field v-model="fd.current" :label="$t('current')" :rules="rule.password" type="password" filled single-line />
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="fd.new" :label="$t('new')" :rules="rule.password" :type="showPW ? 'text' : 'password'" :append-icon="showPW ? 'visibility' : 'visibility_off'" @click:append="showPW = !showPW" filled single-line />
                </v-col>
                <v-col cols="12" md="7">
                    <v-btn @click="change()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
                        {{ $t('change') }}
                    </v-btn>
                </v-col>
            </v-row>
        </vcontainer>
    </v-form>
</template>

<script>
import account from '@/store/modules/account'

export default {
    name: 'ChangePass',
    modules: {
        account
    },

    data () {
        return {
            showPW: false,
            sending: false,
            fd: {
                current: '',
                new: ''
            },
            rule: {
                valid: false,
                password: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) || this.$t('strong'),
                    v => v.length < 255 || this.$t('alert.v.tooLong', { amount: 255 })
                ]
            }
        }
    },

    methods: {
        change () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('account/change', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('pleaseLogin') })
                this.$store.dispatch('auth/logout').finally(() => {
                    this.$router.push({ name: 'auth.login' })
                })
            }).catch(r => {
                if (r === 'password_wrong') this.$notify({ type: 'error', title: this.$t('failpass') })
                else this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }
    },

    i18n: {
        messages: {
            en: {
                current: 'Current Password',
                new: 'New Password',
                pleaseLogin: 'Your Password has been changed. Please Login with your new Password.',
                change: 'Change Password',
                failpass: 'Current Password incorrect',
                strong: 'New password is not strong enough'
            },
            de: {
                current: 'Aktuelles Passwort',
                new: 'Neues Password',
                pleaseLogin: 'Dein Passwort wurde geändert. Melde dich bitte mit deinem neuen Passwort an.',
                change: 'Passwort ändern',
                failpass: 'Aktuelles Passwort falsch',
                strong: 'Das neue Password ist nicht stark genug'
            }
        }
    }

}
</script>
