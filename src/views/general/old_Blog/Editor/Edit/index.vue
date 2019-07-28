<template>
    <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>
        <v-layout row wrap justify-space-around>

            <v-flex xs12 md8 lg9>
                <Form v-model="fd" />
            </v-flex>

            <v-flex xs12 md4 lg3>
                <v-card>
                    <v-list>
                        <v-list-tile>
                            <v-btn :disabled="!changes" @click="send()" type="submit" color="primary" block depressed>
                                {{ $t('btn.save') }}
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile>
                            <v-btn block depressed disabled @click="saveLocal()">
                                {{ $t('safelocal') }}
                            </v-btn>
                        </v-list-tile>
                        <v-divider />
                    </v-list>

                    <v-layout row wrap pl-3 pr-3>
                        <v-flex xs12>
                            <div class="title">{{ $t('tags') }}</div>
                        </v-flex>
                        <v-flex xs12>
                            <v-chip small v-for="(tag, key) in fd.tags" :key="key" @click="rmTag(tag)" @input="rmTag(tag)" close>
                                {{ tag }}
                            </v-chip>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="tagField" @click:prepend="addTag()" :label="$t('addTag')" clearable prepend-icon="add" type="text" />
                        </v-flex>
                    </v-layout>

                    <v-list>
                        <v-divider />
                        <v-list-tile>
                            <div class="title">{{ $t('design') }}</div>
                        </v-list-tile>
                        <v-list-tile>
                            <v-text-field v-model="fd.img_url" :label="$t('image')" type="text" />
                        </v-list-tile>
                        <v-list-tile>
                            <v-text-field v-model="fd.color" :label="$t('color')" type="text" />
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action text-center>
                                <v-switch v-model="fd.dark" />
                            </v-list-tile-action>
                            <v-list-tile-content>
                                {{ $t('darkmode') }}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <Preview :content="fd" />
                        </v-list-tile>
                    </v-list>

                </v-card>
            </v-flex>

        </v-layout>
    </v-form>
</template>

<script>
import Form from '@/views/general/Blog/Editor/Edit/Form'
const Preview = () => import('@/views/general/Blog/Editor/Edit/Preview')

export default {
    name: 'Edit',

    components: {
        Form, Preview
    },

    data () {
        return {
            sending: false,
            changes: true,
            justLoad: true,
            tagField: '',
            store: [],
            fd: {
                url: '',
                title: '',
                keywords: [],
                content: '',
                language: '',
                publicationDate: '',
                color: '',
                dark: '',
                description: '',
                img_url: '',
                img_lazy: '',
                img_phrase: ''
            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    methods: {

        send () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            var path = 'general/blog/edit/'
            if (vm.$route.name === 'blog.editor.add') path = 'general/blog/create/'

            vm.sending = true
            vm.$http.post(path, vm.fd).then(function (r) {
                vm.$notify({ type: 'success', text: vm.$t('alert.success.save') })
                vm.$router.push({ name: 'blog.editor.edit', params: { url: vm.fd.url } })
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        },

        addTag () {
            if (this.tagField.length > 0 && this.fd.tags.indexOf(this.tagField) < 0) {
                this.fd.keywords.push(this.tagField)
                this.tagField = ''
            }
        },

        rmTag (tag) {
            var index = this.fd.tags.indexOf(tag)
            if (index > -1) this.fd.tags.splice(index, 1)
        }

    },

    mounted () {
        var vm = this

        if (vm.$route.name === 'blog.editor.add') {
            var now = new Date()
            var str = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()
            vm.fd.creation_date = str.substr(0, 10)
            vm.fd.creation_time = str.substr(11, 5)
        } else
            vm.$http.post('general/blog/read/edit/', { url: vm.$route.params.url }).then(function (r) {
                vm.fd = r.data.article
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.loading = false
            })
    },

    i18n: {
        messages: {
            en: {
                tags: 'Keywords',
                image: 'Image (URL)',
                addTag: 'Add Keyword',
                safelocal: 'Safe locally',
                needContent: 'Please add some content',
                darkmode: 'Dark Theme',
                color: 'Color',
                design: 'Preview Design'
            },
            de: {
                tags: 'Schlüsselwörter',
                image: 'Bild (URL)',
                addTag: 'Hinzufügen',
                safelocal: 'Lokal speichern',
                needContent: 'Dem Beitrag fehlt Inhalt',
                darkmode: 'Dunkles Design',
                color: 'Farbe',
                design: 'Vorschau Darstellung'
            }
        }
    }

    /*
    watch: {
        fd: {
            handler (newVal, oldVal) {
                if (this.justLoad) this.justLoad = false
                else this.changes = true
            },
            deep: true
        }
    }
    */

}
</script>
