<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

        <YouSure @accept="remove()" @decline="sure = false" :show="sure" />

        <vcontainer>

            <v-row align="center" justify="center" v-if="loaded && fd" dense>

                <v-col cols="12" :md="showPublicator ? '10':'12'">
                    <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.require" type="text" filled />
                </v-col>
                <v-col cols="auto" md="auto" class="ml-md-auto mr-md-auto" v-if="showPublicator">
                    <v-checkbox v-model="fd.public" :label="fd.public? $t('public')+'!':$t('public')+'?'" class="mt-0" />
                </v-col>

                <v-col cols="12">
                    <v-textarea :label="$t('ft.description')" v-model="fd.description" counter="255" outlined />
                </v-col>

                <v-col cols="12" class="text-center">
                    <div class="caption text-left">{{ $t('image') }}</div>
                    <ImageInput v-model="fd.image" height="200" contain />
                </v-col>

                <v-col cols="12">
                    <div class="caption">{{ $t('content') }}</div>
                    <TextEditor v-model="fd.content" />
                </v-col>

                <v-col cols="12">
                    <Calories v-model="fd.calories" :rules="rule.require" />
                </v-col>

                <v-col cols="12">
                    <Types v-model="fd.type" :rules="rule.require" />
                </v-col>
                <v-col cols="12" class="pb-5">
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
import ImageInput from '@/components/ImageInput'
import exercise from '@/store/modules/exercise'
import Bodyparts from '@/views/app/Exercise/Edit/Bodyparts'
import Calories from '@/views/app/Exercise/Edit/Calories'
import TextEditor from '@/views/app/Exercise/Edit/TextEditor'
import Types from '@/views/app/Exercise/Edit/Types'
const notFound = () => import('@/views/error/NotFound')
const YouSure = () => import('@/components/YouSure')

export default {
    name: 'EditExercise',
    components: {
        ImageInput, notFound, Bodyparts, Types, YouSure, TextEditor, Calories
    },
    modules: {
        exercise
    },

    data () {
        return {
            saved: false,
            sure: false,
            loaded: true,
            sending: false,
            fd: {
                title: null,
                description: null,
                image: null,
                content: null,
                public: false,
                type: 'other',
                calories: null,
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
                this.saved = true
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

            var form = this.fd
            form.imageID = (this.fd.image ? this.fd.image.id : null)
            delete form.image

            this.$store.dispatch(action, form).then(r => {
                this.saved = true
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
                this.fd.content = res.content
                this.fd.type = res.type
                this.fd.calories = res.calories || null
                this.fd.bodyparts = res.bodyparts
            }
        }).catch(() => {
            this.fd = null
        }).finally(() => {
            this.loaded = true
        })
    },

    beforeRouteLeave (to, from, next) {
        if (this.saved) next()
        else {
            var r = confirm(this.$t('notSaved'))
            if (r === true) next()
            else next(false)
        }
    },

    i18n: {
        messages: {
            en: {
                notSaved: 'Are you sure you want to leave? Unsaved changes will be lost...',
                title: 'Exercise',
                public: 'Public',
                image: 'Image',
                content: 'Content / Details'
            },
            de: {
                notSaved: 'Bist du sicher, dass du gehen willst? Nicht gespeicherte Änderungen gehen dabei verloren...',
                title: 'Übung',
                public: 'Öffentlich',
                repetsPerDo: 'Wiederholungen pro Ausführung',
                image: 'Bild',
                content: 'Inhalt / Details'
            }
        }
    }

}
</script>
