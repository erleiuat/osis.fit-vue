<template>
    <v-dialog v-model="value" :fullscreen="$vuetify.breakpoint.xs" width="600px" persistent scrollable transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar color="primary" fixed flat dark>
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="$emit('input', false)">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-container grid-list-sm pa-0>
                    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                        <v-layout wrap>

                            <v-flex xs12>
                                <v-text-field v-model="fd.title" :label="$t('ft.title')" type="text" outlined append-icon="open_in_new" />
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
                                <ImageInput v-model="fd.image" />
                            </v-flex>

                            <v-flex xs12>
                                <v-btn @click="save()" :loading="sending" block type="submit" color="primary">{{ $t('btn.save') }}</v-btn>
                            </v-flex>

                        </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>

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

    props: ['value', 'item'],

    data () {
        return {
            sending: false,
            fd: {
                title: null,
                amount: null,
                caloriesPer100: null,
                image: null
            },
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

    methods: {

        save () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            var form = {
                imageID: (this.fd.image ? this.fd.image.id : null),
                title: this.fd.title,
                amount: this.fd.amount,
                caloriesPer100: this.fd.caloriesPer100,
            }

            if (this.fd.id) {

                form.id = this.fd.id
                this.$store.dispatch('food/edit', form).then(r => {
                    this.$notify({ type: 'success', text: this.$t('alert.success.save') })
                    this.$emit('input', false)
                }).catch(r => {
                    this.$notify({ type: 'error', text: this.$t('alert.error.save'), detail: r.message })
                }).finally(() => {
                    this.sending = false
                })

            } else
                this.$store.dispatch('food/add', clonedeep(this.fd)).then(r => {
                    this.$notify({ type: 'success', text: this.$t('alert.success.save') })
                    this.$emit('input', false)
                }).catch(r => {
                    this.$notify({ type: 'error', text: this.$t('alert.error.save') })
                }).finally(() => {
                    this.sending = false
                })
        }

    },

    watch: {
        item (val) {
            if (val) this.fd = val
            else {
                this.$refs.form.reset()
            }
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
