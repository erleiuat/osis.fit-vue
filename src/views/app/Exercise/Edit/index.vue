<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

        <YouSure @accept="remove()" @decline="sure = false" :show="sure" />

        <vcontainer>

            <v-row align="start" justify="center" v-if="loaded && fd" dense>

                <v-col cols="12" :md="showPublicator ? '10':'12'">
                    <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.require" type="text" filled />
                </v-col>
                <v-col cols="12" md="auto" class="ml-md-auto mr-md-auto" v-if="showPublicator">
                    <v-checkbox v-model="fd.public" :label="$t('public')" />
                </v-col>

                <v-col cols="12">
                    <v-textarea :label="$t('ft.description')" v-model="fd.description" outlined />
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field :label="$t('calsPerDo')" v-model="fd.calories" type="number" filled suffix="Kcal" />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field :label="$t('repetsPerDo')" v-model="fd.repetitions" type="number" filled />
                </v-col>

                <v-col cols="12">
                    <Types v-model="fd.type" :rules="rule.require" />
                </v-col>
                <v-col cols="12">
                    <Bodyparts v-model="fd.bodyparts" />
                </v-col>

                <v-col cols="12" md="6">
                    <v-btn @click="save()" :loading="sending" color="primary" type="submit" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-if="$route.name === 'exercise.edit'">
                    <v-btn @click="sure = true" block depressed>
                        {{ $t('btn.delete') }}
                    </v-btn>
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
import exercise from '@/store/modules/exercise'
import Bodyparts from '@/views/app/Exercise/Edit/Bodyparts'
import Types from '@/views/app/Exercise/Edit/Types'
const notFound = () => import('@/views/error/NotFound')
const YouSure = () => import('@/components/YouSure')

export default {
    name: 'EditExercise',
    components: {
        notFound, Bodyparts, Types, YouSure
    },
    modules: {
        exercise
    },

    data () {
        return {
            sure: false,
            loaded: true,
            sending: false,
            fd: {
                title: null,
                description: null,
                public: false,
                type: null,
                calories: null,
                repetitions: null,
                bodyparts: []
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
        showPublicator () {
            if (this.$store.getters['auth/level'] === 'moderator') return true
            else if (this.$store.getters['auth/level'] === 'admin') return true
            else return false
        }
    },

    methods: {

        remove () {
            this.sure = false
            if (!this.fd.id) return

            this.$store.dispatch('exercise/delete', this.fd.id).then(r => {
                this.$router.push({ name: 'exercise.saved' })
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.deleting = false
            })
        },

        save () {
            if (!this.$refs.form.validate()) return
            var action = 'exercise/edit'
            if (this.$route.name !== 'exercise.edit') action = 'exercise/add'

            this.sending = true
            this.$store.dispatch(action, this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                if (this.$route.name === 'exercise.copy') this.$router.replace({ name: 'exercise', params: { type: 'own', id: r } })
                else this.$router.go(-1)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.name === 'exercise.new' || !this.$route.params.id) return

        this.loaded = false
        this.$store.dispatch('exercise/get', this.$route.params.id).then(res => {
            if (this.$route.name === 'exercise.edit') this.fd = res
            else if (this.$route.name === 'exercise.copy') {
                this.fd.title = res.title
                this.fd.description = res.description
                this.fd.type = res.type
                this.fd.calories = res.calories
                this.fd.repetitions = res.repetitions
                this.fd.bodyparts = res.bodyparts
            }
        }).catch(() => {
            this.fd = null
        }).finally(() => {
            this.loaded = true
        })
    },

    i18n: {
        messages: {
            en: {
                title: 'Exercise',
                public: 'Public',
                calsPerDo: 'Calories burned per execution',
                repetsPerDo: 'Repetitions per execution'
            },
            de: {
                title: 'Übung',
                public: 'Öffentlich',
                calsPerDo: 'Kalorienverbrauch pro Ausführung',
                repetsPerDo: 'Wiederholungen pro Ausführung'
            }
        }
    }

}
</script>
