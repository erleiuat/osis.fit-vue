<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" width="600px" scrollable transition="dialog-bottom-transition">
        <v-card>

            <YouSure @accept="remove()" @decline="sure = false" :show="sure" />

            <v-card-title class="pl-0 pt-0 pr-0">
                <v-toolbar color="primary" flat dark>
                    <v-btn icon @click="show=false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="fd.id">{{ $t('titleEdit') }}</v-toolbar-title>
                    <v-toolbar-title v-else>{{ $t('titleAdd') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="sure = true" v-if="fd.id">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn icon @click="save()" :loading="sending" v-else>
                        <v-icon>save</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="pa-0">
                <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                    <vcontainer>
                        <v-row dense>

                            <v-col cols="12">
                                <v-text-field v-model="fd.title" :label="$t('ft.title')" :rules="rule.title" type="text" outlined />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="fd.caloriesPer100" :label="$t('caloriesPer100')" :rules="rule.require" type="number" outlined />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="fd.amount" :label="$t('ft.amount')" :rules="rule.require" type="number" outlined />
                            </v-col>

                            <v-col cols="12">
                                {{ $t('calories') }}: {{ total }}
                            </v-col>

                            <v-col cols="12" v-if="$store.getters['auth/premium']">
                                <ImageInput v-model="fd.image" height="200" contain/>
                            </v-col>
                            <v-col cols="12" v-else>
                                <v-btn block depressed large :to="{name: 'premium'}">
                                    {{ $t('needsPremium') }}
                                </v-btn>
                            </v-col>

                            <v-col cols="12">
                                <v-btn @click="save()" :loading="sending" block type="submit" color="primary">
                                    {{ $t('btn.save') }}
                                </v-btn>
                            </v-col>

                        </v-row>
                    </vcontainer>
                </v-form>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import ImageInput from '@/components/ImageInput'

import food from '@/store/modules/food'

const YouSure = () => import('@/components/YouSure')

export default {
    name: 'FoodEditor',

    components: {
        ImageInput, YouSure
    },

    modules: {
        food
    },

    data () {
        return {
            sure: false,
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
        },

        show: {
            get () {
                if (this.$route.name === 'food.add') return true
                if (this.$route.name === 'food.edit' && this.$route.params.id) {
                    this.getItem()
                    return true
                }
                return false
            },
            set (val) {
                if (!val) this.$router.push({ name: 'food' })
            }
        }

    },

    methods: {

        getItem () {
            var item = clonedeep(this.$store.getters['food/id'](this.$route.params.id))
            if (item) this.fd = item
        },

        remove () {
            this.sure = false
            if (!this.fd.id) return

            this.$store.dispatch('food/delete', this.fd.id).then(r => {
                this.$router.push({ name: 'food' })
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.deleting = false
            })
        },

        save () {
            if (!this.$refs.form.validate()) return false

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

            this.sending = true
            this.$store.dispatch(action, form).then(r => {
                this.$router.push({ name: 'food' })
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
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
