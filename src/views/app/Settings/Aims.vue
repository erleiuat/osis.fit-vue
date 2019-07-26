<template>
    <v-card flat>

        <v-card-title>
            <h3 class="display-2">{{ $t('title') }}</h3>
        </v-card-title>

        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent v-if="editMode">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field :label="$t('weight')" v-model="fd.weight" :rules="rule.require" type="number" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="fd.date" lazy full-width width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="fd.date" :label="$t('date')" append-icon="event" :rules="rule.require" readonly v-on="on" type="date" />
                            </template>
                            <v-date-picker v-model="fd.date" scrollable :locale="$store.state.app.language">
                                <v-btn icon @click="modal = false">
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="$refs.dialog.save(fd.date)">
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
            <v-layout row wrap>
                <v-flex xs6 overflow-hidden>
                    <span class="subheading">{{ $t('weight') }}</span><br />
                    <span class="headline">{{ fd.weight || '-' }}</span>
                </v-flex>
                <v-flex xs6>
                    <span class="subheading">{{ $t('date') }}</span><br />
                    <span class="headline">{{ fd.date || '-' }}</span>
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
    name: 'EditAims',

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
                weight: this.$store.state.user.aims.weight,
                date: this.$store.state.user.aims.date
            }
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
            vm.$http.post('user/edit/aims/', vm.fd).then(function (r) {
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
                title: 'Aims',
                weight: 'Weight',
                date: 'Date'
            },
            de: {
                title: 'Ziele',
                weight: 'Gewicht',
                date: 'Datum'
            }
        }
    }

}
</script>
