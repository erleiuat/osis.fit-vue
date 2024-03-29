<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="600px" scrollable transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>

            <v-card-title class="pa-0">
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
            </v-card-title>

            <v-card-text class="pa-0">

                <vcontainer class="pa-2">
                    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                        <v-row dense align="baseline">

                            <v-col cols="6">
                                <v-btn @click="selector = true" color="primary" block small>
                                    {{ $t('selectTemplate') }}
                                    <v-icon right small>open_in_new</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col cols="6" v-if="scanner.phone">
                                <PhoneScanner @select="use" />
                            </v-col>
                            <v-col cols="6" v-else-if="scanner.quagga">
                                <QuaggaScanner @select="use" />
                            </v-col>
                            <v-col cols="6" v-else>
                                <v-btn :to="{name: 'premium', query: { notify: true }}" block small outlined color="amber">
                                    {{ $t('scanCode') }}
                                    <v-icon right>photo_camera</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col cols="12" class="mt-1">
                                <v-text-field v-model="fd.title" :label="$t('ft.title')" type="text" outlined hide-details />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" outlined hide-details />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="fd.time" :label="$t('ft.time')" :rules="rule.require" type="time" outlined append-icon="access_time" hide-details />
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field v-model="caloriesPer100" :label="$t('caloriesPer100')" @input="calTotal()" outlined type="number" suffix="Kcal" hide-details />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="amount" :label="$t('ft.amount')" @input="calTotal()" outlined type="number" suffix="g / ml" hide-details />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field v-model="fd.calories" :label="$t('calories')" :rules="rule.require" type="number" suffix="Kcal" outlined />
                            </v-col>
                            <v-col cols="12">
                                <v-btn @click="add()" :loading="sending" :disabled="!rule.valid" type="submit" color="primary" block depressed>{{ $t('btn.save') }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </vcontainer>

                <TemplateSelect :show="selector" @select="use" />

            </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
const TemplateSelect = () => import('@/components/adder/TemplateSelect/')
const PhoneScanner = () => import('@/components/adder/Calories/PhoneScanner')
const QuaggaScanner = () => import('@/components/adder/Calories/QuaggaScanner')

export default {
    name: 'CalorieAdder',

    components: {
        TemplateSelect, PhoneScanner, QuaggaScanner
    },

    data () {
        return {
            selector: false,
            show: false,
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
                    v =>
                        (v && v.length < 150) || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                require: [v => !!v || this.$t('alert.v.require')]
            }
        }
    },

    computed: {

        scanner () {
            var toShow = {
                phone: false,
                quagga: false
            }
            if (this.$store.getters['auth/premium']) {
                if (process.env.CORDOVA_PLATFORM) toShow.phone = true
                else toShow.quagga = true
            }
            return toShow
        }

    },

    watch: {
        show: function () {
            var now = new Date()
            var str = new Date(
                now.getTime() - now.getTimezoneOffset() * 60000
            ).toISOString()
            this.fd.date = str.substr(0, 10)
            this.fd.time = str.substr(11, 5)
        }
    },

    methods: {

        calTotal () {
            if (this.amount > 0 && this.caloriesPer100 > 0) {
                this.fd.calories = Math.round((this.amount / 100) * this.caloriesPer100 * 100) / 100
            } else this.fd.calories = 0
        },

        add () {
            if (!this.$refs.form.validate()) return

            this.sending = true
            this.$store.dispatch('calories/add', this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.show = false
                this.$refs.form.reset()
                this.fd.title = null // TODO: CREATE OWN FORM VALIDATION
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        },

        use (item) {
            this.selector = false
            if (!item) return
            this.fd.title = item.title
            this.amount = item.amount
            this.caloriesPer100 = item.caloriesPer100
            this.calTotal()
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Add Calories',
                caloriesPer100: 'Calories per 100 g/ml',
                calories: 'Calories Total',
                selectTemplate: 'Templates'
            },
            de: {
                title: 'Kalorien hinzufügen',
                caloriesPer100: 'Kalorien pro 100 g/ml',
                calories: 'Kalorien Total',
                selectTemplate: 'Vorlagen'
            }
        }
    }

}
</script>
