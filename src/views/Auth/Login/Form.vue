<template>
    <v-form v-model="rule.valid" ref="form" @submit.prevent>
        <v-container class="fill-height flex-column">
            <v-row>

                <v-text-field v-model="fd.identifier" :label="$t('ft.identifier')" :rules="rule.require" type="text" filled rounded single-line />
                <v-text-field v-model="fd.password" :label="$t('password')" :rules="rule.require" type="password" filled rounded single-line />
                <v-btn @click="login()" :loading="sending" type="submit" color="primary" depressed large block>
                    {{ $t('login') }}
                </v-btn>

            </v-row>
        </v-container>
    </v-form>
</template>

<script>
export default {
    name: 'Form',

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

        login () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('auth/login', this.fd).then(r => {
                if (this.$route.query.target) this.$router.push({ name: this.$route.query.target })
                else this.$router.push({ name: 'dashboard' })
            }).catch(r => {
                switch (r) {
                case 'password_wrong':
                    this.$notify({ type: 'error', title: this.$t('fail.pass'), text: r })
                    break
                case 'account_not_found':
                    this.$notify({ type: 'error', title: this.$t('fail.unknown'), text: r })
                    break
                case 'account_not_verified':
                    this.$notify({ type: 'error', title: this.$t('fail.verify'), text: r })
                    break
                default:
                    this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: r })
                    break
                }
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.query.mail) this.fd.identifier = this.$route.query.mail
    }

}
</script>