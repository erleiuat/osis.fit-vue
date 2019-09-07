<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
        <vcontainer>

            <YouSure @accept="remove()" @decline="sure = false" :show="sure" />

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

                <v-col cols="12">
                    <Exercises v-model="fd.exercises" />
                </v-col>

                <v-col cols="12" md="6">
                    <v-btn @click="save()" :loading="sending" color="primary" type="submit" block depressed>
                        {{ $t('btn.save') }}
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-if="$route.name === 'training.edit'">
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
import Exercises from '@/views/app/Training/Edit/Exercises'
import training from '@/store/modules/training'
const notFound = () => import('@/views/error/NotFound')
const YouSure = () => import('@/components/YouSure')

export default {
    name: 'EditTraining',
    components: {
        notFound, Exercises, YouSure
    },
    modules: {
        training
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
                exercises: []
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

            this.$store.dispatch('training/delete', this.fd.id).then(r => {
                this.$router.push({ name: 'training.saved' })
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.deleting = false
            })
        },

        save () {
            if (!this.$refs.form.validate()) return
            var action = 'training/edit'
            if (this.$route.name !== 'training.edit') action = 'training/add'

            this.sending = true
            this.$store.dispatch(action, this.fd).then(r => {
                this.$notify({ type: 'success', title: this.$t('alert.success.save') })
                if (this.$route.name === 'training.copy') this.$router.replace({ name: 'training', params: { type: 'own', id: r } })
                else this.$router.go(-1)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            }).finally(() => {
                this.sending = false
            })
        }

    },

    mounted () {
        if (this.$route.name === 'training.new' || !this.$route.params.id) return

        this.loaded = false
        this.$store.dispatch('training/get', this.$route.params.id).then(res => {

            if (this.$route.name === 'training.edit') this.fd = res
            else if (this.$route.name === 'training.copy') {
                this.fd.title = res.title
                this.fd.description = res.description
                this.fd.exercises = res.exercises
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
                title: 'Training',
                public: 'Public'
            },
            de: {
                title: 'Training',
                public: 'Öffentlich'
            }
        }
    }

}
</script>
