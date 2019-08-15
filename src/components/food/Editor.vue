<template>
    <v-dialog v-model="value" :fullscreen="$vuetify.breakpoint.xs" width="600px" persistent scrollable transition="dialog-bottom-transition">
        <v-card>
            <YouSure @accept="remove()" @decline="sure = false" :show="sure" />

            <v-card-title class="pl-0 pt-0 pr-0">
                <v-toolbar color="primary" flat dark>
                    <v-toolbar-title v-if="fd.id">{{ $t('titleEdit') }}</v-toolbar-title>
                    <v-toolbar-title v-else>{{ $t('titleAdd') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$emit('input', false)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-xs pl-0 pr-0>

                    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                        <v-layout wrap>

                            <v-input v-model="fd.id" type="hidden" v-show="false" />
                            <v-input v-model="fd.image" type="hidden" v-show="false" />

                            <v-flex xs12 pb-0>
                                <v-text-field v-model="fd.title" :label="$t('ft.title')" :rules="rule.title" type="text" outlined />
                            </v-flex>

                            <v-flex xs12 sm6 pt-0 pb-0>
                                <v-text-field v-model="fd.caloriesPer100" :label="$t('caloriesPer100')" :rules="rule.require" type="number" outlined />
                            </v-flex>
                            <v-flex xs12 sm6 pt-0 pb-0>
                                <v-text-field v-model="fd.amount" :label="$t('ft.amount')" :rules="rule.require" type="number" outlined />
                            </v-flex>

                            <v-flex xs12 pa-0 text-center>
                                {{ $t('calories') }}: {{ total }}
                            </v-flex>

                            <v-flex xs12 v-if="$store.getters['auth/premium']">
                                <ImageInput v-model="fd.image" />
                            </v-flex>
                            <v-flex xs12 v-else pa-2>
                                <v-btn block :to="{name: 'premium'}">
                                    {{ $t('needsPremium') }}
                                </v-btn>
                            </v-flex>

                            <v-flex xs12>
                                <v-btn @click="save()" :loading="sending" block type="submit" color="primary">{{ $t('btn.save') }}</v-btn>
                            </v-flex>

                            <v-flex xs12 v-if="fd.id" pt-2>
                                <v-btn @click="sure = true" :loading="deleting" block small depressed>{{ $t('delete') }}</v-btn>
                            </v-flex>

                        </v-layout>
                    </v-form>
                </v-container>

            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
import storeModule from '@/store/modules/food'

import ImageInput from '@/components/ImageInput'
const YouSure = () => import('@/components/YouSure')

export default {
    name: 'FoodEditor',

    components: {
        ImageInput, YouSure
    },

    props: ['value', 'item'],

    created () {
        this.$store.useModule(storeModule)
    },

    data () {
        return {
            sure: false,
            deleting: false,
            sending: false,
            fd: {
                id: null,
                title: null,
                amount: null,
                caloriesPer100: null,
                image: null
            },
            rule: {
                valid: false,
                title: [
                    v => (!!v || v > 0) || this.$t('alert.v.require'),
                    v => (v && v.length < 150) || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                require: [
                    v => (!!v || v > 0) || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {
        total () {
            if (!this.fd.amount || !this.fd.caloriesPer100) return null
            return Math.round(((this.fd.amount / 100) * this.fd.caloriesPer100) * 100) / 100
        }
    },

    methods: {

        remove () {
            this.sure = false

            if (!this.fd.id) return

            this.deleting = true
            this.$store.dispatch('food/delete', this.fd.id).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.$emit('input', false)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.deleting = false
            })
        },

        save () {
            if (!this.$refs.form.validate()) return false
            this.sending = true

            var action = 'food/add'
            var form = {
                imageID: (this.fd.image ? this.fd.image.id : null),
                title: this.fd.title,
                amount: this.fd.amount,
                caloriesPer100: this.fd.caloriesPer100
            }

            if (this.fd.id) {
                form.id = this.fd.id
                action = 'food/edit'
            }

            this.$store.dispatch(action, form).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                this.$emit('input', false)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    watch: {
        item (val) {
            if (val) this.fd = val
        },
        value (val) {
            if (!val) this.$refs.form.reset()
        }
    },

    i18n: {
        messages: {
            en: {
                needsPremium: 'Add Images with premium!',
                delete: 'Delete',
                titleAdd: 'Add Food',
                titleEdit: 'Edit Food',
                caloriesPer100: 'Calories per 100 (g/ml)',
                calories: 'Calories Total'
            },
            de: {
                needsPremium: 'Füge Bilder mit Premium hinzu!',
                delete: 'Löschen',
                titleAdd: 'Essware hinzufügen',
                titleEdit: 'Essware bearbeiten',
                caloriesPer100: 'Kalorien pro 100 (g/ml)',
                calories: 'Kalorien Total'
            }
        }
    }

}
</script>
