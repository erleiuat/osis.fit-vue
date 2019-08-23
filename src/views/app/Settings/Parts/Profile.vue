<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-row justify="center" align="center" dense>

                <v-col cols="7" sm="6" md="4" v-if="$store.getters['auth/premium']">
                    Profilbild
                    <ImageInput v-model="fd.image" />
                </v-col>
                <v-col cols="8" sm="6" md="4" v-else>
                    Profilbild
                    <v-btn block depressed large :to="{name: 'premium'}">
                        {{ $t('needsPremium') }}
                    </v-btn>
                </v-col>

                <v-col cols="12" md="5">
                    <v-row justify="center">
                        <v-col cols="12" md="11">
                            <v-text-field :label="$t('firstname')" v-model="fd.firstname" :rules="rule.require" type="text" filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :label="$t('lastname')" v-model="fd.lastname" :rules="rule.require" type="text" filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :value="$store.state.account.mail" disabled :label="$t('email')" filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :value="$store.state.account.username" disabled :label="$t('username')" filled />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row justify="center" dense>
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" color="primary" type="submit" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
            </v-row>

        </v-form>
    </vcontainer>
</template>

<script>
import ImageInput from '@/components/ImageInput'

export default {
    name: 'EditProfile',

    components: {
        ImageInput
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    data () {
        var data = this.$store.getters['user/user']
        return {
            menu: false,
            sending: false,
            fd: {
                image: data.image,
                firstname: data.firstname,
                lastname: data.lastname
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {

        genders () {
            return [
                { text: this.$t('g.male'), value: 'male' },
                { text: this.$t('g.female'), value: 'female' }
            ]
        }

    },

    watch: {
        menu (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false

            var form = {
                imageID: (this.fd.image ? this.fd.image.id : null),
                firstname: this.fd.firstname,
                lastname: this.fd.lastname
            }

            this.sending = true
            this.$store.dispatch('user/editProfile', form).then(r => {
                this.edit = false
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Profile',
                firstname: 'Firstname',
                lastname: 'Lastname',
                birthdate: 'Birthdate',
                gender: 'Gender',
                height: 'Height (cm)',
                mail: 'Mail',
                g: {
                    null: '-',
                    male: 'Male',
                    female: 'Female'
                }
            },
            de: {
                title: 'Profil',
                firstname: 'Vorname',
                lastname: 'Nachname',
                birthdate: 'Geburtsdatum',
                gender: 'Geschlecht',
                height: 'Grösse (cm)',
                mail: 'Mail',
                g: {
                    null: '-',
                    male: 'Männlich',
                    female: 'Weiblich'
                }
            }
        }
    }

}
</script>
