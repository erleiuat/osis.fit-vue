<template>
    <v-dialog v-model="show" v-show="show" :fullscreen="$vuetify.breakpoint.xs" width="600" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn fab depressed large v-on="on" color="primary">
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card v-if="show">
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

                <v-toolbar flat color="primary" class="white--text" v-show="$vuetify.breakpoint.xs">
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
                        <v-flex grow>
                            <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.title" type="text" />
                        </v-flex>
                        <v-flex shrink class="text-center pl-2">
                            <TemplateSelect v-model="fd" />
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-text-field :label="$t('ft.date')" v-model="fd.date" :rules="rule.require" type="date" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$t('ft.time')" v-model="fd.time" :rules="rule.require" type="time" />
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field @input="reCal(1)" :label="$t('ft.amount')" v-model="fd.amount" type="number" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field @input="reCal(2)" :label="$t('calorie_per_100')" v-model="fd.caloriesPer100" type="number" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$t('calorie_total')" v-model="fd.calories" :rules="rule.require" type="number" />
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
const TemplateSelect = () => import('@/components/adders/TemplateSelect/')

export default {
    name: 'CalorieAdder',

    components: {
        TemplateSelect
    },

    data () {
        return {
            selector: false,
            show: false,
            today: '',
            sending: false,
            fd: {
                title: '',
                date: '',
                time: '',
                amount: '',
                caloriesPer100: '',
                calories: ''
            },
            rule: {
                valid: false,
                title: [
                    v => v.length < 60 || this.$t('alert.v.tooLong', { amount: 60 })
                ],
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
            this.today = str.substr(0, 10)
            this.fd.date = str.substr(0, 10)
            this.fd.time = str.substr(11, 5)
        }
    },

    methods: {

        reCal (which) {
            switch (which) {
            case 1:
                if (this.fd.caloriesPer100) this.fd.calories = (this.fd.amount / 100) * this.fd.caloriesPer100
                break
            case 2:
                if (this.fd.amount) this.fd.calories = (this.fd.amount / 100) * this.fd.caloriesPer100
                break
            }
        },

        add () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            vm.sending = true
            vm.$http.post('log/calorie/add/', vm.fd).then(function (r) {
                if (vm.fd.date === vm.today) vm.$store.state.data.calorie_log.push(r.data.object)
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
                title: 'Add Calories',
                calorie_per_100: 'Calories per 100 (g/ml)',
                calorie_total: 'Calories Total'
            },
            de: {
                title: 'Kalorien hinzufügen',
                calorie_per_100: 'Kalorien pro 100 (g/ml)',
                calorie_total: 'Kalorien Total'
            }
        }
    }

}
</script>
