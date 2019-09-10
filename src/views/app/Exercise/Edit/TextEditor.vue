<template>
    <div>
        <vue-editor v-model="contents" :editorOptions="editorSettings" />
    </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
    name: 'TextEditor',

    components: {
        VueEditor
    },

    props: ['value'],

    data () {
        return {
            editorSettings: {
                modules: {
                    imageDrop: true,
                    imageResize: {}
                }
            }
        }
    },

    computed: {

        contents: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }

    }

}
</script>
