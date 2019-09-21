<template>
    <vcontainer align="space-evenly" :class="$vuetify.breakpoint.xsOnly ? 'pa-2': ''">

        <v-row v-if="item && loaded" align="center" justify="center" dense>
            <v-col cols="12" md="10" class="title">
                {{ item.title }}
            </v-col>
            <v-col cols="12" md="10" class="body-2">
                <v-sheet class="pa-2 text-left">
                    {{ getByLang($store.getters['app'].locale, item.description) }}
                </v-sheet>
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" align="center" dense>
            <v-col cols="12" class="body-2" v-if="item.exercises">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('exercises') }}</div>
                    <v-expansion-panels accordion>
                        <v-expansion-panel v-for="(exe, key) in item.exercises" :key="key">
                            <v-expansion-panel-header>

                                <v-row no-gutters align="center">
                                    <v-col cols="1" md="1">
                                        {{ key+1 }}.
                                    </v-col>
                                    <v-col cols="6" md="6" class="title">
                                        {{ exe.title }}
                                    </v-col>
                                    <v-col cols="5" md="5" class="text-right">
                                        ( <i>{{ exe.duration }}</i> )
                                    </v-col>
                                </v-row>

                            </v-expansion-panel-header>
                            <v-expansion-panel-content>

                                <v-row no-gutters align="center">
                                    <v-col cols="12" class="caption">
                                        {{ getByLang($store.getters['app'].locale, exe.description) }}
                                    </v-col>
                                    <v-col cols="11">
                                        <div class="caption" v-if="exe.bodyparts">{{ $t('bodyparts') }}</div>
                                        <v-chip v-for="(bp, key) in exe.bodyparts" :key="key" class="ml-1 mr-1 mb-1">
                                            {{ $t('pnt.parts.'+bp) }}
                                        </v-chip>
                                    </v-col>
                                    <v-col cols="1" class="text-right">
                                        <v-btn v-if="$route.params.type === 'own'" :to="{name: 'exercise', params: {type: 'own', id: exe.id}}" icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-btn>
                                        <v-btn v-else :to="{name: 'exercise', params: {type: 'public', id: exe.id}}" icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row v-if="item && loaded" align="center" dense>

            <v-col cols="6">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('totalCals') }}</div>
                    {{ total.calories || 0 }} <span class="font-italic font-weight-light">Kcal</span>
                </v-sheet>
            </v-col>
            <v-col cols="6">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('totalduration') }}</div>
                    {{ total.duration || 0 }} <span class="font-italic font-weight-light">hh:mm</span>
                </v-sheet>
            </v-col>

            <v-col cols="12">
                <v-sheet class="pa-2">
                    <div class="caption">{{ $t('public') }}</div>
                    {{ item.public ? $t('pTrue'):$t('pFalse') }}
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
import clonedeep from 'lodash.clonedeep'
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

        userWeight () {
            if (!this.$store.getters['weight/latest']) return false
            else return this.$store.getters['weight/latest'].weight
        },

        total () {
            var cals = 0
            var time = 0
            if (!this.item.exercises) return 0
            if (!this.userWeight) return 0
            this.item.exercises.forEach(el => {
                if (el.calories && el.duration) {
                    var hAm = el.duration.split(':')
                    var tMins = parseFloat(hAm[0]) * 60 + parseFloat(hAm[1])
                    cals += el.calories * (tMins / 60) * this.userWeight
                    time += tMins
                }
            })

            var hours = Math.round(time / 60)
            var minutes = Math.round(((time / 60) - hours) * 60)

            if (minutes < 0) {
                hours += -1
                minutes = (60 + minutes)
            }

            return {
                calories: Math.round(cals),
                duration: hours + ':' + minutes
            }
        },

        item () {
            if (this.training) return this.training
            return []
        }

    },

    methods: {

        buildPrivate (item) {
            item.exercises = item.exercises.map(el => {
                var tmp = clonedeep(this.$store.getters['exercise/id'](el.id))
                tmp.duration = el.duration
                return tmp
            })
            this.training = item
        },

        buildPublic (item) {
            var ids = []
            var durations = {}

            item.exercises.forEach(el => {
                durations[el.id] = el.duration
                ids.push(el.id)
            })

            this.$store.dispatch('exercise/get', ids).then(res => {
                item.exercises = res.map(el => {
                    el.duration = durations[el.id]
                    return el
                })
                this.training = item
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.load'), text: r })
            })
        },

        getByLang (lang, string) {
            lang = lang.toUpperCase()
            if(!string) return null
            if (string.includes("[" + lang + "]")) {
                return string.substring(
                    string.lastIndexOf("[" + lang + "]") + 4,
                    string.lastIndexOf("[/" + lang + "]")
                )
            } else if (string.includes("[EN]")) {
                return string.substring(
                    string.lastIndexOf("[EN]") + 4,
                    string.lastIndexOf("[/EN]")
                )
            } else {
                return string
            }
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
                totalCals: 'Calories burned',
                totalduration: 'Duration',
                exercises: 'Exercises',
                bodyparts: 'Affected body parts',
                repetsPerDo: 'Repetitions',
                pFalse: 'No',
                pTrue: 'Yes'
            },
            de: {
                title: 'Plan',
                public: 'Öffentlich',
                totalCals: 'Kalorienverbrauch',
                totalduration: 'Dauer',
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
