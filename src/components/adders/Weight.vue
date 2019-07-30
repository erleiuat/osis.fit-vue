<template>
    <v-dialog v-model="show" v-show="show" :fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card v-if="show">
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

                <v-toolbar color="primary" class="white--text" v-show="$vuetify.breakpoint.xs">
                    <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon @click="show = false">
                            <v-icon right color="white">close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-card-title class="headline primary white--text" v-show="!$vuetify.breakpoint.xs">
                    {{ $t('title') }}
                </v-card-title>

                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-text-field :label="$t('ft.date')" v-model="fd.date" :rules="rule.require" type="date" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$t('ft.time')" v-model="fd.time" :rules="rule.require" type="time" />
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field :label="$t('ft.amount')" v-model="fd.weight" :rules="rule.require" type="number" />
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider v-show="!$vuetify.breakpoint.xs" />

                <v-card-actions v-if="$vuetify.breakpoint.xs">
                    <v-btn @click="add()" block color="primary" :disabled="sending" :loading="sending" type="submit">
                        {{ $t('btn.save') }}
                        <span slot="loader" class="spinning-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>

                <v-card-actions v-else>
                    <v-btn @click="show = false" flat>{{ $t('btn.close') }}</v-btn>
                    <v-spacer />
                    <v-btn @click="add()" flat :disabled="sending" :loading="sending" type="submit">
                        {{ $t('btn.save') }}
                        <span slot="loader" class="spinning-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>

            </v-form>
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
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    watch: {
        show: function () {
            var now = new Date()
            var str = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()
            this.fd.date = str.substr(0, 10)
            this.fd.time = str.substr(11, 5)
        }
    },

    methods: {

        add () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('log/weight/add/', vm.fd).then(function (r) {
                vm.$store.state.data.weight_log.push(r.data.object)
                vm.$notify({ type: 'success', text: vm.$t('alert.success.save') })
                vm.show = false
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Add Weight'
            },
            de: {
                title: 'Gewicht hinzufügen'
            }
        }
    }

}
</script>
