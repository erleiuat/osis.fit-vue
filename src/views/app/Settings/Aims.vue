<template>
    <v-card flat>

        <v-card-title>
            <div class="display-2">{{ $t('title') }}</div>
        </v-card-title>

        <v-card-text v-if="!edit">
            <v-layout row wrap>
                <v-flex xs6 overflow-hidden>
                    <span class="subheading">{{ $t('weight') }}</span><br />
                    <span class="headline">{{ $store.state.user.aims.weight || '-' }}</span>
                </v-flex>
                <v-flex xs6>
                    <span class="subheading">{{ $t('date') }}</span><br />
                    <span class="headline">{{ $store.state.user.aims.date || '-' }}</span>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions v-if="!edit">
            <v-btn @click="edit = !edit" depressed>{{ $t('btn.edit') }}</v-btn>
        </v-card-actions>

        <v-form v-model="rule.valid" ref="form" v-on:submit.prevent v-if="edit">
            <v-card-text>

                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" />
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="fd.date" full-width width="290px">
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

                <v-btn @click="edit = !edit" depressed>{{ $t('btn.cancel') }}</v-btn>
                <v-spacer v-if="$vuetify.breakpoint.xs" />
                <v-btn @click="save()" :loading="sending" color="secondary" type="submit">
                    {{ $t('btn.save') }}
                </v-btn>

            </v-card-actions>
        </v-form>

    </v-card>
</template>

<script>
export default {
    name: 'EditAims',

    data () {
        return {
            edit: false,
            modal: false,
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
                weight: this.$store.state.user.aims.weight,
                date: this.$store.state.user.aims.date
            }
        }
    },

    mounted () {
        this.$store.dispatch('user/load')
    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false

            this.sending = true
            this.$store.dispatch('user/edit', { aims: this.fd }).then(r => {
                this.edit = false
                this.$notify({ type: 'success', text: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', text: this.$t('alert.error.save') })
            }).finally(() => {
                this.sending = false
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
