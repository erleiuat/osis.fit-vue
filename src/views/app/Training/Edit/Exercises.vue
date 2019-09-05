<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header class="body-1">
                {{ $t('exercises') }}{{ exercises.length ? ': '+exercises.length:'' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content eager>
                <v-row v-for="(i, key) in exercises" :key="key" dense>
                    <v-col cols="12" md="6">
                        <v-select :items="list" :label="$t('exercise')" v-model="i.id" @change="doEmit()" item-value="id" item-text="title" hide-details />
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field :label="$t('repetitions')" v-model="i.repetitions" @change="doEmit()" type="number" hide-details />
                    </v-col>
                    <v-col cols="12" md="1">
                        <v-btn @click="removeOne(i.id)" icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters>
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

    mounted () {
        this.$store.dispatch('exercise/load')
    },

    i18n: {
        messages: {
            en: {
                exercises: 'Exercises'

            },
            de: {
                exercises: 'Übungen'
            }
        }
    }

}
</script>
