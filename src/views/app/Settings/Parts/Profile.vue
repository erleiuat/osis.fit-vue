<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-row justify="center" align="center" no-gutters>

                <v-col cols="9" sm="6" md="4" v-if="$store.getters['auth/premium']" class="text-center">
                    <ImageInput v-model="fd.image" ratio="1" />
                </v-col>

                <v-col cols="12" sm="6" md="4" v-else class="text-center">
                    <v-btn :to="{name: 'premium'}" color="amber" light block depressed large>
                        <v-icon left>star</v-icon>
                        {{ $t('needsPremium') }}
                    </v-btn>
                </v-col>

                <v-col cols="12" md="5">
                    <v-row justify="center" align="center" no-gutters>
                        <v-col cols="12" md="11">
                            <v-text-field :label="$t('firstname')" v-model="fd.firstname" :rules="rule.require" type="text" filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :label="$t('lastname')" v-model="fd.lastname" :rules="rule.require" type="text" filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :value="$store.state.auth.account.mail" disabled :label="$t('mail')" hide-details filled />
                        </v-col>
                        <v-col cols="12" md="11">
                            <v-text-field :value="$store.state.auth.account.username" disabled :label="$t('username')" hide-details filled />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" sm="4">
                    <v-btn @click="save()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
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

    data () {
        return {
            sending: false,
            fd: {
                image: null,
                firstname: null,
                lastname: null
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

        save () {
            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('user/editProfile', {
                imageID: (this.fd.image ? this.fd.image.id : null),
                firstname: this.fd.firstname,
                lastname: this.fd.lastname
            }).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                if (this.$vuetify.breakpoint.smAndDown) {
                    this.$router.push({ name: 'settings' })
                    // this.$router.back()
                }
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        var data = this.$store.getters['user/user']
        this.fd.image = data.image
        this.fd.firstname = data.firstname
        this.fd.lastname = data.lastname
    },

    i18n: {
        messages: {
            en: {
                needsPremium: 'Upload Avatar',
                title: 'Profile',
                profPic: 'Avatar',
                firstname: 'Firstname',
                lastname: 'Lastname',
                birthdate: 'Birthdate',
                gender: 'Gender',
                height: 'Height (cm)',
                mail: 'Mail',
                username: 'Username',
                g: {
                    null: '-',
                    male: 'Male',
                    female: 'Female'
                }
            },
            de: {
                needsPremium: 'Profilbild hochladen',
                title: 'Profil',
                profPic: 'Profilbild',
                firstname: 'Vorname',
                lastname: 'Nachname',
                birthdate: 'Geburtsdatum',
                gender: 'Geschlecht',
                height: 'Grösse (cm)',
                mail: 'Mail',
                username: 'Benutzername',
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
