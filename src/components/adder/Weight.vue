<template>
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" hide-overlay width="600" scrollable transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card>

            <v-toolbar flat color="primary" dark>
                <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
                <v-card-text>
                    <v-container grid-list-sm pa-0>
                        <v-layout wrap>
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

                            <v-flex xs12>
                                <v-text-field v-model="fd.weight" :label="$t('weight')" :rules="rule.require" type="number" outlined />
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn @click="show = false" text>Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="add()" :loading="sending" type="submit" color="primary" text>Save</v-btn>
                </v-card-actions>
            </v-form>

        </v-card>
    </v-dialog>
</template>

<script>
const TemplateSelect = () => import('@/components/adder/TemplateSelect/')
import clonedeep from 'lodash'

export default {
    name: 'WeightAdder',

    components: {
        TemplateSelect
    },

    data () {
        return {
            show: false,
            dMenu: false,
            tMenu: false,
            sending: false,
            fd: {
                date: '',
                time: '',
                weight: ''
            },
            rule: {
                valid: false,
                title: [
                    v => v && v.length < 150 || this.$t('alert.v.tooLong', { amount: 150 })
                ],
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    watch: {
        show: function () {
            if(!this.show) return
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

            //TODO CLONEDEEP

            this.$store.dispatch('weight/add', clonedeep(this.fd)).then(r => {
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
