<template>
    <v-layout row wrap justify-space-around>


        <v-flex xs12 md8>
            <v-text-field :label="$t('ft.date')" v-model="value.publicationDate" type="date" />
        </v-flex>
        
        <v-flex xs12 md4>
            <v-radio-group row v-model="value.language" @change="makeUrl()" :rules="rule.require" class="justify-center">
                <v-radio :label="$t('german')" value="de" color="primary"></v-radio>
                <v-radio :label="$t('english')" value="en" color="primary"></v-radio>
            </v-radio-group>
        </v-flex>
        
        <v-flex xs12>
            <v-divider />
        </v-flex>

        <v-flex xs12>
            <v-text-field :disabled="$route.name !== 'blog_editor_add'" :label="$t('url')" prefix="/blog/post/" v-model="value.url" :rules="rule.url" counter="40" type="text" />
        </v-flex>
        <v-flex xs12>
            <v-text-field :label="$t('ft.title')" v-model="value.title" @input="makeUrl()" :rules="rule.title" counter="30" outline type="text" />
        </v-flex>
        <v-flex xs12>
            <v-textarea :label="$t('description')" v-model="value.description" :rules="rule.description" counter="280" type="text" outline />
        </v-flex>
        <v-flex xs12 fill-height>
            <v-card min-height="400" fill-height>
                <v-card-title class="display-1 pb-0">
                    {{ $t('content') }}
                </v-card-title>
                <v-card-text fill-height>
                    <div style="border: 2px solid rgba(0,0,0,0.54); border-radius: 4px;">
                        <ckeditor :config="editorConfig" :editor="editor" v-model="value.content" style="min-height: 400px;" />
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>

    </v-layout>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
// import Image from '@ckeditor/ckeditor5-image/src/image';

export default {
    name: 'Edit',

    components: {
        ckeditor: CKEditor.component
    },

    props: {
        value: Object
    },

    data () {
        return {
            editor: InlineEditor,
            editorConfig: {

            },
            rule: {
                valid: false,
                require: [
                    v => !!v || this.$t('alert.v.require')
                ],
                url: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length <= 40 || this.$t('alert.v.tooLong', { amount: 40 })
                ],
                description: [
                    v => v.length <= 280 || this.$t('alert.v.tooLong', { amount: 280 })
                ],
                title: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length <= 30 || this.$t('alert.v.tooLong', { amount: 30 })
                ]
            }
        }
    },

    methods: {
        makeUrl () {
            if (this.$route.name === 'blog.editor.add') this.value.url = this.value.title.replace(/ /gi, '-').toLowerCase()
        }
    },

    i18n: {
        messages: {
            en: {
                content: 'Content',
                german: 'German',
                english: 'English',
                language: 'Language',
                active: 'Active',
                url: 'Path / URL',
                description: 'Description/Preview'
            },
            de: {
                content: 'Inhalt',
                url: 'Pfad / URL',
                description: 'Beschreibung/Vorschau',
                german: 'Deutsch',
                english: 'Englisch',
                language: 'Sprache',
                active: 'Aktiv'
            }
        }
    }

}
</script>
