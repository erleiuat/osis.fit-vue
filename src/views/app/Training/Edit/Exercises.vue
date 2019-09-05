<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('exercises') }}{{ exercises.length ? ': '+exercises.length:'' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager >

                <v-card outlined>
                    <v-card-text class="pt-1 pb-1 pl-2 text-center">
                        {{ $t('totalCals') }}: {{ totalCals }}
                    </v-card-text>
                </v-card>

                <v-card v-for="(i, key) in exercises" :key="key" outlined class="mt-1 mb-1">
                    <v-card-text class="pt-1 pb-1 pl-2 text-center">

                        <v-row dense align="center" justify="end">
                            <v-col cols="1" md="1" class="title">
                                {{ key }}
                            </v-col>
                            <v-col cols="11" md="5">
                                <v-select :items="list" :label="$t('exercise')" v-model="i.id" @change="doEmit()" item-value="id" item-text="title" hide-details />
                            </v-col>
                            <v-col cols="10" md="5">
                                <v-text-field :label="$t('repetitions')" v-model="i.repetitions" @change="doEmit()" type="number" hide-details />
                            </v-col>
                            <v-col cols="1" md="1">
                                <v-btn @click="removeOne(i.id)" icon>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>

                </v-card>

                <v-row dense>
                    <v-col cols="12" class="text-right">
                        <v-btn @click="anotherOne()" depressed>
                            <v-icon left>add</v-icon>
                            {{ $t('btn.add') }}
                        </v-btn>
                    </v-col>
                </v-row>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import exercise from '@/store/modules/exercise'

export default {
    name: 'Exercises',

    props: [
        'value'
    ],

    modules: {
        exercise
    },

    computed: {

        totalCals () {
            var sum = 0

            this.exercises.forEach(el => {
                if (!el.id) return
                var ent = this.$store.getters['exercise/id'](el.id)
                if (ent.calories) {
                    var tmp = ent.calories / ent.repetitions
                    sum += tmp * el.repetitions
                }
            })

            return Math.round(sum)
        },

        exercises: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },

        list () {
            return this.$store.getters['exercise/all']
        }

    },

    methods: {
        doEmit () {
            this.$emit('input', this.exercises)
        },
        removeOne (id) {
            this.exercises = this.exercises.filter(function (el) { return el.id !== id })
        },
        anotherOne () {
            this.exercises.push({ id: null, repetitions: 0 })
        }
    },

    i18n: {
        messages: {
            en: {
                exercises: 'Exercises',
                totalCals: 'Total calories burned'
            },
            de: {
                exercises: 'Übungen',
                totalCals: 'Total Kalorienverbrauch'
            }
        }
    }

}
</script>
