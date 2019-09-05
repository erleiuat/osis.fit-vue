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

            <v-col cols="12" class="body-2" v-if="item.exercises">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('exercises') }}</div>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(exe, key) in item.exercises" :key="key">
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
            training: false,
            loaded: false
        }
    },

    computed: {

        totalCals () {
            var sum = 0
            if (!this.item.exercises) return 0
            this.item.exercises.forEach(el => {
                if (el.calories) sum += (el.calories / el.repsOrg) * el.repetitions
            })
            return Math.round(sum)
        },

        item () {
            if (this.training) return this.training
            return []
        }

    },

    methods: {

        buildPrivate (item) {
            item.exercises = item.exercises.map(el => {
                var tmp = this.$store.getters['exercise/id'](el.id)
                tmp.repsOrg = tmp.repetitions
                tmp.repetitions = el.repetitions
                return tmp
            })
            this.training = item
        },

        buildPublic (item) {
            var ids = []
            var reps = {}
            item.exercises.forEach(el => {
                reps[el.id] = el.repetitions
                ids.push(el.id)
            })

            this.$store.dispatch('exercise/get', ids).then(res => {
                item.exercises = res.map(el => {
                    el.repsOrg = el.repetitions
                    el.repetitions = reps[el.id]
                    return el
                })
                this.training = item
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.load'), text: r })
            })
        }

    },

    mounted () {
        this.$store.dispatch('training/get', this.$route.params.id).then(res => {
            if (this.$route.params.type === 'own') this.buildPrivate(res)
            else this.buildPublic(res)
        }).catch(r => {
            this.$notify({ type: 'error', title: this.$t('alert.error.load'), text: r })
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
