<template>
    <v-card flat>

        <v-card-title>
            <h3 class="display-2">{{ $t('title') }}</h3>
        </v-card-title>

        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent v-if="editMode">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-text-field :label="$t('firstname')" v-model="fd.firstname" :rules="rule.require" type="text" />
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field :label="$t('lastname')" v-model="fd.lastname" :rules="rule.require" type="text" />
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field :label="$t('height')" v-model="fd.height" :rules="rule.require" type="number" />
                    </v-flex>
                    <v-flex xs6>
                        <v-select :label="$t('gender')" v-model="fd.gender" :items="genders" :rules="rule.require" />
                    </v-flex>
                    <v-flex xs12>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="fd.birthdate" lazy full-width width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="fd.birthdate" :label="$t('birthdate')" append-icon="event" readonly v-on="on" type="date" />
                            </template>
                            <v-date-picker v-model="fd.birthdate" scrollable :locale="$store.state.app.language">
                                <v-btn icon @click="modal = false">
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="$refs.dialog.save(fd.birthdate)">
                                    <v-icon>check</v-icon>
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                </v-layout>
            </v-card-text>

            <v-card-actions>
                <v-btn @click="toggle()" depressed>{{ $t('btn.cancel') }}</v-btn>
                <v-spacer v-if="$vuetify.breakpoint.xs" />
                <v-btn @click="save()" color="secondary" :disabled="sending" :loading="sending" type="submit">
                    {{ $t('btn.save') }}
                    <span slot="loader" class="spinning-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
            </v-card-actions>
        </v-form>

        <v-card-text v-if="!editMode">
            <v-layout row wrap overflow-hidden>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('firstname') }}</span><br />
                    <span class="headline">{{ fd.firstname || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('lastname') }}</span><br />
                    <span class="headline">{{ fd.lastname || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('height') }}</span><br />
                    <span class="headline">{{ fd.height || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('gender') }}</span><br />
                    <span class="headline">{{ $t('g.'+fd.gender) }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading">{{ $t('birthdate') }}</span><br />
                    <span class="headline">{{ fd.birthdate || '-' }}</span>
                </v-flex>
                <v-flex xs6 sm4>
                    <span class="subheading font-italic">{{ $t('mail') }}</span><br />
                    <span class="caption font-italic">{{ $store.state.auth.user.mail }}</span>
                </v-flex>
            </v-layout>
        </v-card-text>

        <v-card-actions v-if="!editMode">
            <v-btn @click="toggle()" depressed>{{ $t('btn.edit') }}</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
export default {
    name: 'EditProfile',

    data () {
        return {
            modal: false,
            editMode: false,
            sending: false,
            fdOrg: {},
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
                birthdate: this.$store.state.user.birthdate,
                height: this.$store.state.user.height,
                gender: this.$store.state.user.gender
            }
        },

        genders () {
            return [
                { text: this.$t('g.male'), value: 'male' },
                { text: this.$t('g.female'), value: 'female' }
            ]
        }

    },

    methods: {

        toggle () {
            if (!this.editMode) this.fdOrg = Object.assign({}, this.fd)
            else for (var key in this.fdOrg) this.fd[key] = this.fdOrg[key]
            this.editMode = !this.editMode
        },

        save () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('user/edit/profile/', vm.fd).then(function (r) {
                vm.editMode = false
                vm.$notify({ type: 'success', text: vm.$t('alert.success.save') })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
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
