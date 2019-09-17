<template>
    <v-sheet light>
        <vue-editor v-model="contents" :editor-toolbar="customToolbar" />
    </v-sheet>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    name: 'TextEditor',

    components: {
        VueEditor
    },

    props: ['value'],

    data () {
        return {
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ align: '' }, { align: 'center' }, { align: 'right' }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['code-block', 'link', 'video']
            ]
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
