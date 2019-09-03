<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
        <vcontainer>

            <v-row align="center" v-if="loaded && fd" dense>
                <v-col cols="12">
                    <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.require" type="text" filled />
                </v-col>
                <v-col cols="12">
                    <v-textarea :label="$t('ft.description')" v-model="fd.description" outlined />
                </v-col>
                <v-col cols="12" md="3">
                    <v-checkbox v-model="fd.public" :label="$t('public')" />
                </v-col>
                <v-col cols="12" md="3" class="body-2">
                    Typ: <br />
                    <v-radio-group v-model="fd.type" :mandatory="false">
                        <v-radio v-for="(i, key) in types" :label="i.title" :value="i.value" :key="key" />
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="3" class="body-2">
                    <v-text-field :label="$t('calsPerDo')" v-model="fd.calories" :rules="rule.require" type="number" filled />
                </v-col>
                <v-col cols="12" md="3" class="body-2">
                    <v-text-field :label="$t('repetsPerDo')" v-model="fd.repetitions" :rules="rule.require" type="number" filled />
                </v-col>

                <v-col cols="12" class="body-2">
                    Beanspruchte Körperteile<br />
                    {{ fd.bodyparts }}
                </v-col>
            </v-row>

            <v-row align="center" justify="center" v-else-if="!loaded">
                <v-progress-linear indeterminate />
            </v-row>

            <v-row align="center" justify="center" v-else>
                <notFound />
            </v-row>

        </vcontainer>
    </v-form>
</template>

<script>
const notFound = () => import('@/views/error/NotFound')
import exercise from '@/store/modules/exercise'

export default {
    name: 'Exercise',
    components: {
        notFound
    },
    modules: {
        exercise
    },

    data () {
        return {
            loaded: false,
            sending: false,
            fd: {
                title: null,
                description: null,
                public: null,
                type: null,
                calories: null,
                repetitions: null,
                bodyparts: null
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    computed: {
        types () {
            return [
                { value: 'strength', title: this.$t('types.strength') },
                { value: 'stamina', title: this.$t('types.stamina') },
                { value: 'fitness', title: this.$t('types.fitness') },
                { value: 'flexibility', title: this.$t('types.flexibility') },
                { value: 'coordination', title: this.$t('types.coordination') }
            ]
        }
    },

    mounted () {
        this.$store.dispatch('exercise/get', this.$route.params.id).then(res => {
            this.fd.title = res.title
        }).catch(err => {
            this.fd = null
        }).finally(() => {
            this.loaded = true
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Exercise'
            },
            de: {
                title: 'Übung'
            }
        }
    }

}
</script>
