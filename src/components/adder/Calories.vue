<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="600px" hide-overlay transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>
            <v-toolbar color="primary" flat dark>
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container grid-list-sm>
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <v-layout wrap>

                        <v-flex xs12>
                            <v-text-field v-model="fd.title" :label="$t('ft.title')" type="text" outlined append-icon="open_in_new" />
                        </v-flex>

                        <v-flex xs6>
                            <v-menu ref="menu" v-model="dMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" outlined readonly v-on="on" />
                                </template>
                                <v-date-picker v-model="fd.date" @input="dMenu = false" no-title />
                            </v-menu>
                        </v-flex>
                        <v-flex xs6>
                            <v-menu ref="menu" v-model="tMenu" :return-value.sync="fd.time" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="fd.time" :label="$t('ft.time')" :rules="rule.require" type="time" outlined readonly v-on="on" />
                                </template>
                                <v-time-picker v-if="tMenu" v-model="fd.time" full-width @click:minute="$refs.menu.save(fd.time)" format="24hr" no-title />
                            </v-menu>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field v-model="caloriesPer100" :label="$t('caloriesPer100')" @input="calTotal()" outlined />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field v-model="amount" :label="$t('ft.amount')" @input="calTotal()" outlined />
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field v-model="fd.calories" :label="$t('calories')" :rules="rule.require" type="number" outlined />
                        </v-flex>

                        <v-flex xs12>
                            <v-btn @click="add()" :loading="sending" block type="submit" color="primary">{{ $t('btn.save') }}</v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
// const TemplateSelect = () => import('@/components/adder/TemplateSelect/')

export default {
    name: 'CalorieAdder',

    components: {
        // TemplateSelect TODO
    },

    data () {
        return {
            show: false,
            dMenu: false,
            tMenu: false,
            sending: false,
            amount: '',
            caloriesPer100: '',
            fd: {
                title: '',
                date: '',
                time: '',
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
            if (this.amount > 0 && this.caloriesPer100 > 0)
                this.fd.calories = Math.round(((this.amount / 100) * this.caloriesPer100) * 100) / 100
            else this.fd.calories = 0
        },

        add () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            this.$store.dispatch('calories/add', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.show = false
                this.$refs.form.reset()
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
                title: 'Add Calories',
                caloriesPer100: 'Calories per 100 (g/ml)',
                calories: 'Calories Total'
            },
            de: {
                title: 'Kalorien hinzufügen',
                caloriesPer100: 'Kalorien pro 100 (g/ml)',
                calories: 'Kalorien Total'
            }
        }
    }

}
</script>
