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

            <v-container grid-list-md>
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <v-layout wrap>

                        <v-flex xs12>
                            <v-text-field v-model="fd.title" :label="$t('ft.title')" type="text" outlined hide-details />
                        </v-flex>

                        <v-flex xs6>
                            <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" outlined hide-details />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="fd.time" :label="$t('ft.time')" :rules="rule.require" type="time" outlined append-icon="access_time" hide-details />
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field v-model="fd.calories" :label="$t('calories')" :rules="rule.require" type="number" outlined autofocus suffix="Kcal" />
                        </v-flex>

                        <v-flex xs12 v-if="$store.getters['auth/premium']">
                            <v-btn @click="add()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>
                                {{ $t('btn.save') }}
                            </v-btn>
                        </v-flex>

                        <v-flex xs12 v-else>
                            <v-btn :to="{name: 'premium', query: { notify: true }}" :disabled="!rule.valid" type="submit" color="primary" block depressed>
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
    name: 'ActivityAdder',

    data () {
        return {
            show: false,
            sending: false,
            fd: {
                title: '',
                date: '',
                time: '',
                duration: '',
                calories: ''
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

        calTotal () {
            if (this.amount > 0 && this.caloriesPer100 > 0) {
                this.fd.calories = Math.round(((this.amount / 100) * this.caloriesPer100) * 100) / 100
            } else this.fd.calories = 0
        },

        add () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('activity/add', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.show = false
                this.$refs.form.reset()
                this.fd.title = null // TODO: CREATE OWN FORM VALIDATION
                this.fd.duration = null // TODO: CREATE OWN FORM VALIDATION
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
                title: 'Add Activity',
                duration: 'Duration',
                calories: 'Calories burned'
            },
            de: {
                title: 'Aktivität hinzufügen',
                duration: 'Dauer',
                calories: 'Kalorien verbraucht'
            }
        }
    }

}
</script>
