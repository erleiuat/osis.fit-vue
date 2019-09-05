<template>
    <vcontainer align="space-evenly">

        <v-row v-if="item && loaded" align="center" justify="center" dense>
            <v-col cols="12" md="10" class="title">
                {{ item.title }}
            </v-col>
            <v-col cols="12" md="10" class="body-2">
                {{ item.description }}
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" align="center" dense>

            <v-col cols="6">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('public') }}</div>
                    {{ item.public ? $t('pTrue'):$t('pFalse') }}
                </v-sheet>
            </v-col>

            <v-col cols="6">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('totalCals') }}</div>
                    {{ totalCals || 0 }} <span class="font-italic font-weight-light">Kcal</span>
                </v-sheet>
            </v-col>

            <v-col cols="12" class="body-2" v-if="item.exercises.length">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('exercises') }}</div>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(exe, key) in exerciseItems" :key="key">
                            <v-expansion-panel-header>
                                {{ exe.repetitions }} x {{ exe.title }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                {{ exe.description }}
                                <div class="caption">{{ $t('bodyparts') }}</div>
                                <v-chip v-for="(bp, key) in exe.bodyparts" :key="key" class="ml-1 mr-1 mb-1">
                                    {{ $t('pnt.parts.'+bp) }}
                                </v-chip>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-sheet>
            </v-col>

        </v-row>

        <v-row align="center" justify="center" v-else-if="!loaded">
            <v-progress-linear indeterminate />
        </v-row>

        <v-row align="center" v-else>
            <notFound />
        </v-row>

    </vcontainer>
</template>

<script>
import exercise from '@/store/modules/exercise'
import training from '@/store/modules/training'

const notFound = () => import('@/views/error/NotFound')

export default {
    name: 'Training',
    components: {
        notFound
    },
    modules: {
        training, exercise
    },

    data () {
        return {
            iData: false,
            loaded: false,
            loadedExercises: []
        }
    },

    computed: {

        totalCals () {
            var sum = 0
            this.exerciseItems.forEach(el => {
                if (el.calories) sum += (el.calories / el.repsOrg) * el.repetitions
            })
            return Math.round(sum)
        },

        item () {
            if (this.iData) return this.iData
            return false
        },

        exerciseItems () {
            if (this.loadedExercises) return this.loadedExercises
            else return []
        }

    },

    methods: {

        privateExercises () {
            var reps = {}
            this.item.exercises.forEach(el => {
                reps[el.id] = el.repetitions
                this.loadedExercises.push(this.$store.getters['exercise/id'](el.id))
            })

            this.loadedExercises.forEach(el => {
                el.repsOrg = el.repetitions
                el.repetitions = reps[el.id]
            })
        },

        publicExercises () {
            var ids = []
            var reps = {}
            this.item.exercises.forEach(el => {
                reps[el.id] = el.repetitions
                ids.push(el.id)
            })

            this.$store.dispatch('exercise/get', ids).then(res => {
                this.loadedExercises = res
                this.loadedExercises.forEach(el => {
                    el.repsOrg = el.repetitions
                    el.repetitions = reps[el.id]
                })
            }).finally(() => {
                if (!this.loadedExercises) this.loadedExercises = []
            })
        }

    },

    mounted () {
        this.$store.dispatch('training/get', this.$route.params.id).then(res => {
            this.iData = res
            if (this.$route.params.type === 'own') this.privateExercises()
            else this.publicExercises()
        }).finally(() => {
            this.loaded = true
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Training',
                public: 'Public',
                totalCals: 'Total calories burned',
                exercises: 'Exercises',
                bodyparts: 'Affected body parts',
                repetsPerDo: 'Repetitions',
                pFalse: 'No',
                pTrue: 'Yes'
            },
            de: {
                title: 'Plan',
                public: 'Öffentlich',
                totalCals: 'Total Kalorienverbrauch',
                exercises: 'Übungen',
                bodyparts: 'Betroffene Körperteile',
                repetsPerDo: 'Wiederholungen',
                pFalse: 'Nein',
                pTrue: 'Ja'
            }
        }
    }

}
</script>
