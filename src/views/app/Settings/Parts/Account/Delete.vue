<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent fill-height>
        <vcontainer>
            <v-row dense justify="center">
                <v-col cols="12" md="7">
                    {{ $t('youSure') }}
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="fd.username" :label="$t('username')" :rules="rule.username" type="text" filled single-line />
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.password" type="password" filled single-line />
                </v-col>
                <v-col cols="12" md="7">
                    <v-btn @click="delAcc()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
                        {{ $t('delete') }}
                    </v-btn>
                </v-col>
            </v-row>
        </vcontainer>
    </v-form>
</template>

<script>
import account from '@/store/modules/account'

export default {
    name: 'Delete',
    modules: {
        account
    },

    data () {
        return {
            sending: false,
            fd: {
                username: '',
                password: ''
            },
            rule: {
                valid: false,
                username: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v === this.$store.getters['auth/account'].username || this.$t('wrongUser')
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
        delAcc () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('account/delete', this.fd).then(r => {
                this.$notify({ type: 'info', title: this.$t('goodbye') })
                this.$store.dispatch('auth/logout').finally(() => {
                    this.$router.push({ name: 'welcome' })
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
                username: 'Username',
                wrongUser: 'Username is wrong',
                password: 'Current Password',
                failpass: 'Current Password incorrect',
                delete: 'Delete Account',
                goodbye: 'Sad to see you go! Your data will be permanently deleted in a few weeks.',
                youSure: `
                    Do you want to delete your Account? Please enter your credentials as a precaution.
                    By deleting your account, it will get locked and you won't be able to login again.
                    After a few weeks, your account and all your data will be deleted permanent.
                `
            },
            de: {
                username: 'Benutzername',
                wrongUser: 'Benutzername falsch',
                password: 'Aktuelles Passwort',
                failpass: 'Falsches Passwort',
                delete: 'Konto löschen',
                goodbye: 'Schade, dass du gehst! Deine Daten werden in wenigen Wochen dauerhaft gelöscht.',
                youSure: `
                    Möchtest du deinen Account löschen? Bitte gib dafür zur Sicherheit deine Zugangsdaten an.
                    Wenn du dein Konto löschst, wird es gesperrt und du kannst dich nicht mehr anmelden.
                    Nach einigen Wochen werden dein Konto und all deine Daten dauerhaft gelöscht.
                `
            }
        }
    }

}
</script>
