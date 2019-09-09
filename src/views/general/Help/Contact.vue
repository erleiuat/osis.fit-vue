<template>
    <vcontainer align="center">
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <div class="display-3">
                    {{ $t('contact') }}
                </div>
                <div class="mt-2 mb-4" v-html="$t('subText')">
                </div>
            </v-col>
        </v-row>

        <transition name="zoom">
            <v-row v-if="success">
                <v-col cols="12" sm="10">
                    <v-alert outline :value="true" type="success" v-if="success">
                        <div class="title" v-html="$t('success.title')" />
                        <div class="body-2" v-html="$t('success.text')" />
                    </v-alert>
                </v-col>
            </v-row>
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent v-else>
                <v-row dense justify="center">
                    <v-col cols="12" sm="3">
                        <v-text-field :label="$t('ft.firstname')" v-model="fd.firstname" type="text" />
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field :label="$t('ft.lastname')" v-model="fd.lastname" type="text" />
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field :label="$t('ft.mail')" v-model="fd.mail" :rules="rule.mail" type="email" />
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-text-field :label="$t('subject')" v-model="fd.subject" :rules="rule.require" type="text" />
                    </v-col>
                    <v-col cols="12" sm="9">
                        <v-textarea :label="$t('message')" v-model="fd.message" :rules="rule.require" />
                    </v-col>
                    <v-col cols="12" sm="7">
                        <v-btn @click="send()" type="submit" :disabled="sending" :loading="sending" color="primary" depressed block>
                            {{ $t('btn.send') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </transition>

    </vcontainer>
</template>

<script>
import Apios from '@/plugins/Apios'

export default {
    name: 'Contact',

    data () {
        return {
            success: false,
            sending: false,
            fd: {
                firstname: '',
                lastname: '',
                mail: '',
                subject: '',
                message: '',
                language: this.$store.state.app.lang
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ],
                mail: [
                    v => !!v || this.$t('alert.v.require'),
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('alert.v.invalid'),
                    v => v.length < 90 || this.$t('alert.v.tooLong', { amount: 90 })
                ]
            }
        }
    },

    mounted () {
        if (this.$store.getters['auth/authorized']) {
            var accInfo = this.$store.getters['auth/account']
            var usrInfo = this.$store.getters['user/user']
            this.fd.firstname = usrInfo.firstname
            this.fd.lastname = usrInfo.lastname
            this.fd.mail = accInfo.mail

        }
    },

    methods: {
        send () {
            if (!this.$refs.form.validate()) return false

            this.sending = true
            Apios.post('general/contact/', this.fd).then(res => {
                this.success = true
            }).catch(e => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: e })
            }).finally(() => {
                this.sending = false
            })

        }
    },

    i18n: {
        messages: {
            en: {
                subText: 'Do you have questions or a problem with the app? <br /> Or do you have an improvement suggestion/criticism for us?',
                contact: 'Contact',
                subject: 'Subject',
                message: 'Message',
                success: {
                    title: 'Thank you!',
                    text: 'Your request has been sent'
                }
            },
            de: {
                subText: 'Hast du Fragen oder ein Problem mit der App? <br /> Oder hast du einen Verbesserungsvorschlag/Kritik für uns?',
                contact: 'Kontakt',
                subject: 'Betreff',
                message: 'Nachricht',
                success: {
                    title: 'Vielen Dank!',
                    text: 'Deine Anfrage wurde versendet'
                }
            }
        }
    }

}
</script>
