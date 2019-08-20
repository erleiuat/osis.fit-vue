<template>
    <vcontainer align="center" style="min-height: 400px;">
        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

            <v-row justify="center" dense>
                <v-col cols="12" sm="5" md="4">
                    <v-text-field :label="$t('firstname')" v-model="fd.firstname" :rules="rule.require" type="text" filled/>
                </v-col>
                <v-col cols="12" sm="5" md="4">
                    <v-text-field :label="$t('lastname')" v-model="fd.lastname" :rules="rule.require" type="text" filled />
                </v-col>
            </v-row>

            <v-row justify="center" dense>
                <v-col cols="12" sm="5" md="4">
                    <v-text-field :label="$t('height')" v-model="fd.height" :rules="rule.require" type="number" filled/>
                </v-col>
                <v-col cols="12" sm="5" md="4">
                    <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" filled />
                </v-col>
            </v-row>

            <v-row justify="center" dense>
                <v-col cols="12" sm="6">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" v-on="on" @focus="menu = true" readonly type="date" append-icon="event" filled />
                        </template>
                        <v-date-picker v-model="fd.birthdate" ref="picker" @change="$refs.menu.save(fd.birthdate)" :locale="$store.getters['locale']" />
                    </v-menu>
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
export default {
    name: 'EditProfile',

    data () {
        return {
            menu: false,
            sending: false,
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {

        fd () {
            return {
                firstname: this.$store.state.user.firstname,
                lastname: this.$store.state.user.lastname,
                height: this.$store.state.user.height,
                gender: this.$store.state.user.gender,
                birthdate: this.$store.state.user.birthdate
            }
        },

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

            this.sending = true
            this.$store.dispatch('user/edit', this.fd).then(r => {
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
