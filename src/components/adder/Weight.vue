<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="600px" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>
            <v-toolbar color="primary" flat dark>
                <v-btn icon @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="add()" :loading="sending" :disabled="!rule.valid">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container grid-list-sm>
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <v-layout wrap>

                        <v-flex xs6>
                            <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" outlined append-icon="calendar_today" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="fd.time" :label="$t('ft.time')" :rules="rule.require" type="time" outlined append-icon="access_time" />
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" suffix="Kg" outlined autofocus />
                        </v-flex>

                        <v-flex xs12>
                            <v-btn @click="add()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
                                {{ $t('btn.save') }}
                            </v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'WeightAdder',

    data () {
        return {
            show: false,
            sending: false,
            fd: {
                date: '',
                time: '',
                weight: ''
            },
            rule: {
                valid: false,
                title: [
                    v => (v && v.length < 150) || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    watch: {
        show: function () {
            if (!this.show) return
            var now = new Date()
            var str = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()
            this.fd.date = str.substr(0, 10)
            this.fd.time = str.substr(11, 5)
        }
    },

    methods: {

        add () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('weight/add', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.show = false
                this.$refs.form.reset()
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Add Weight',
                weight: 'Weight'
            },
            de: {
                title: 'Gewicht hinzufügen',
                weight: 'Gewicht'
            }
        }
    }

}
</script>
