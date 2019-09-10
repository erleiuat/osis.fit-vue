<template>
    <div>
        <vue-editor v-model="contents" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
    name: 'TextEditor',

    components: {
        VueEditor
    },

    props: ['value'],

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
