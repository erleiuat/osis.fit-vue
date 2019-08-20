<template>
    <v-card flat>

        <v-card-text v-if="!edit">
            <v-row dense>
                <v-col cols="6" sm="4" lg="6">
                    <span class="title">{{ $t('firstname') }}</span><br />
                    <span class="subheading">{{ $store.state.user.firstname || '-' }}</span>
                </v-col>
                <v-col cols="6" sm="8" lg="6">
                    <span class="title">{{ $t('lastname') }}</span><br />
                    <span class="subheading">{{ $store.state.user.lastname || '-' }}</span>

                </v-col>

                <v-col cols="6" sm="4" lg="6">
                    <span class="title">{{ $t('height') }}</span><br />
                    <span class="subheading">{{ $store.state.user.height || '-' }}</span>

                </v-col>
                <v-col cols="6" sm="8" lg="6">
                    <span class="title">{{ $t('gender') }}</span><br />
                    <span class="subheading">{{ $t('g.'+$store.state.user.gender) }}</span>

                </v-col>
                <v-col cols="12">
                    <span class="title">{{ $t('birthdate') }}</span><br />
                    <span class="subheading">{{ $dateFormat($store.state.user.birthdate) || '-' }}</span>

                </v-col>

            </v-row>
        </v-card-text>
        <v-card-actions v-if="!edit">
            <v-btn @click="edit = !edit" depressed>{{ $t('btn.edit') }}</v-btn>
        </v-card-actions>

        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent v-if="edit">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field :label="$t('firstname')" v-model="fd.firstname" :rules="rule.require" type="text" />
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field :label="$t('lastname')" v-model="fd.lastname" :rules="rule.require" type="text" />
                    </v-flex>
                    <v-flex xs6 sm4 lg6>
                        <v-text-field :label="$t('height')" v-model="fd.height" :rules="rule.require" type="number" />
                    </v-flex>
                    <v-flex xs6 sm4 lg6>
                        <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" />
                    </v-flex>
                    <v-flex xs12 sm4 lg12>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y full-width min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" v-on="on" @focus="menu = true" readonly type="date" append-icon="event" />
                            </template>
                            <v-date-picker v-model="fd.birthdate" ref="picker" @change="$refs.menu.save(fd.birthdate)" :locale="$store.getters['locale']" />
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-card-text>

            <v-card-actions>
                <v-btn @click="edit = !edit" depressed>{{ $t('btn.cancel') }}</v-btn>
                <v-spacer v-if="$vuetify.breakpoint.xs" />
                <v-btn @click="save()" color="secondary" :disabled="sending" :loading="sending" type="submit">
                    {{ $t('btn.save') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-card-actions>
        </v-form>

    </v-card>
</template>

<script>
export default {
    name: 'EditProfile',

    data () {
        return {
            edit: false,
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
