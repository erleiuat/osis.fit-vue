<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="600px" persistent transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed small v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card v-if="show">
            <v-toolbar color="primary" flat dark>
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container grid-list-xl>
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <v-layout wrap>

                        <v-flex xs12>
                            <v-text-field v-model="value.title" :label="$t('ft.title')" type="text" outlined append-icon="open_in_new" />
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field v-model="fd.caloriesPer100" :label="$t('caloriesPer100')" type="number" outlined />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field v-model="fd.amount" :label="$t('ft.amount')" type="number" outlined />
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field :value="Math.round(((fd.amount / 100) * fd.caloriesPer100) * 100) / 100" :label="$t('calories')" type="number" outlined hide-details />
                        </v-flex>

                        <v-flex xs12>
                            <ImageInput v-model="image" />
                        </v-flex>

                        <v-flex xs12>
                            <v-btn @click="save()" :loading="sending" block type="submit" color="primary">{{ $t('btn.save') }}</v-btn>
                        </v-flex>

                    </v-layout>
                </v-form>
            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
import ImageInput from '@/components/ImageInput'
import clonedeep from 'lodash'

export default {
    name: 'FoodEditor',

    components: {
        ImageInput
    },

    props: ['value'],

    data () {
        return {
            image: false,
            doShow: false,
            sending: false,
            rule: {
                valid: false,
                title: [
                    v => (v && v.length < 150) || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                require: [
                    v => (!!v || v > 0) || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {

        show: {
            get () {
                return this.doShow
            },
            set (val) {
                this.doShow = val
            }
        },

        fd () {
            if (this.value) return {
                id: this.value.id,
                imageID: (this.image ? this.image.id : null),
                title: this.value.title,
                amount: this.value.amount,
                caloriesPer100: this.value.caloriesPer100
            }
            else return {
                imageID: (this.image ? this.image.id : null),
                title: null,
                amount: null,
                caloriesPer100: null
            }
        }

    },

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            if (this.fd.id)
                this.$store.dispatch('food/edit', this.fd).then(r => {
                    this.$notify({ type: 'success', text: this.$t('alert.success.save') })
                    this.show = false
                    this.$refs.form.reset()
                }).catch(r => {
                    this.$notify({ type: 'error', text: this.$t('alert.error.save'), detail: r.message })
                }).finally(() => {
                    this.sending = false
                })
            else
                this.$store.dispatch('food/add', clonedeep(this.fd)).then(r => {
                    this.$notify({ type: 'success', text: this.$t('alert.success.save') })
                    this.show = false
                    this.$refs.form.reset()
                }).catch(r => {
                    this.$notify({ type: 'error', text: this.$t('alert.error.save') })
                }).finally(() => {
                    this.sending = false
                })
        }

    },

    watch: {
        value (val) {
            if (val) {
                if (this.value.image) this.image = this.value.image
                this.show = true
            } else this.show = false
        }
    },

    i18n: {
        messages: {
            en: {
                title: 'Add Food',
                caloriesPer100: 'Calories per 100 (g/ml)',
                calories: 'Calories Total'
            },
            de: {
                title: 'Essware hinzufügen',
                caloriesPer100: 'Kalorien pro 100 (g/ml)',
                calories: 'Kalorien Total'
            }
        }
    }

}
</script>
