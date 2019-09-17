<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('exercises') }}{{ exercises.length ? ': '+exercises.length:'' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>

                <v-card outlined>
                    <v-card-text class="pt-1 pb-1 pl-2 text-center">
                        {{ $t('totalCals') }}: {{ totalCals }} Kcal
                    </v-card-text>
                </v-card>

                <v-card v-for="(i, key) in exercises" :key="key" outlined class="mt-1 mb-1">
                    <v-card-text class="pt-1 pb-1 pl-2 text-center">

                        <v-row dense align="center" justify="end">
                            <v-col cols="1" md="1" class="title">
                                {{ key+1 }}
                            </v-col>
                            <v-col cols="11" md="5">
                                <v-select :items="list" :label="$t('exercise')" v-model="i.id" @change="doEmit()" item-value="id" item-text="title" hide-details />
                            </v-col>
                            <v-col cols="10" md="5">
                                <v-text-field :label="$t('duration')" v-model="i.duration" @change="doEmit()" type="time" hide-details />
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
                    <v-col cols="12">
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

        userWeight () {
            if (!this.$store.getters['weight/latest']) return false
            else return this.$store.getters['weight/latest'].weight
        },

        totalCals () {
            var sum = 0

            this.exercises.forEach(el => {
                if (!el.id || !el.duration) return
                if (!this.userWeight) return
                var ent = this.$store.getters['exercise/id'](el.id)

                if (ent.calories) {
                    var hAm = el.duration.split(':')
                    var tMins = parseFloat(hAm[0]) * 60 + parseFloat(hAm[1])
                    sum += ent.calories * (tMins / 60) * this.userWeight
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
            this.exercises.push({ id: null, duration: null })
        }
    },

    i18n: {
        messages: {
            en: {
                exercises: 'Exercises',
                exercise: 'Exercise',
                duration: 'Duration (hh:mm)',
                totalCals: 'Total calories burned'
            },
            de: {
                exercises: 'Übungen',
                exercise: 'Übung',
                duration: 'Dauer (hh:mm)',
                totalCals: 'Total Kalorienverbrauch'
            }
        }
    }

}
</script>
