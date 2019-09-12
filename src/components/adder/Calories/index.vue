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
                <v-toolbar color="primary" flat dark dense>
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

                <Scanner :show="scanner" @select="use" />

                <vcontainer v-show="!scanner" class="pa-2">
                    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                        <v-row dense align="baseline">
                            <v-col cols="12" md="6">
                                <v-btn @click="openSelect()" block small outlined>
                                    {{ $t('selectTemplate') }}
                                    <v-icon right>view_carousel</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col cols="12" md="6" v-if="$store.getters['auth/premium']">
                                <v-btn @click="scanner = !scanner" block small outlined>
                                    {{ $t('scanCode') }}
                                    <v-icon right>photo_camera</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="6" v-else>
                                <v-btn :to="{name: 'premium', query: { notify: true }}" block small outlined color="amber">
                                    {{ $t('scanCode') }}
                                    <v-icon right>photo_camera</v-icon>
                                </v-btn>
                            </v-col>


                            <v-col cols="12">
                                <v-text-field v-model="fd.title" :label="$t('ft.title')" type="text" outlined />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="fd.date" :label="$t('ft.date')" :rules="rule.require" type="date" outlined />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="fd.time" :label="$t('ft.time')" :rules="rule.require" type="time" outlined append-icon="access_time" />
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field v-model="caloriesPer100" :label="$t('caloriesPer100')" @input="calTotal()" outlined type="number" suffix="Kcal" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="amount" :label="$t('ft.amount')" @input="calTotal()" outlined type="number" suffix="g / ml" />
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
const Scanner = () => import('@/components/adder/Calories/Scanner')

export default {
    name: 'CalorieAdder',

    components: {
        TemplateSelect, Scanner
    },

    data () {
        return {
            selector: false,
            scanner: false,
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

    watch: {
        show: function () {
            if (!this.show) {
                this.scanner = false
                return
            }
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
                this.fd.calories =
                    Math.round((this.amount / 100) * this.caloriesPer100 * 100) / 100
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

        openSelect () {
            this.selector = true
        },

        use (item) {
            this.selector = false
            this.scanner = false
            if (!item) return
            this.fd.title = item.title
            this.amount = item.amount
            this.caloriesPer100 = item.caloriesPer100
            this.calTotal()
        }

    },

    beforeDestroy () {
        this.scanner = false
    },

    i18n: {
        messages: {
            en: {
                title: 'Add Calories',
                caloriesPer100: 'Calories per 100 g/ml',
                calories: 'Calories Total',
                selectTemplate: 'Select Template',
                scanCode: 'Scan Barcode'
            },
            de: {
                title: 'Kalorien hinzufügen',
                caloriesPer100: 'Kalorien pro 100 g/ml',
                calories: 'Kalorien Total',
                selectTemplate: 'Vorlage auswählen',
                scanCode: 'Barcode scannen'
            }
        }
    }

}
</script>

<style>
.quagga-scanner-container {
    height: 400px;
    width: 100%;
    overflow: hidden;
    border: solid 1px gray;
}
.quagga-scanner-container video, .quagga-scanner-container canvas {
    height: 400px !important;
    width: 100% !important;
}
</style>
