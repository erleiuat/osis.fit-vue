<template>
    <v-container grid-list-sm pl-0 pr-0>
        <v-layout row wrap>

            <v-flex xs12 sm8 v-if="!value">
                <v-btn block @click="$refs.uLf.click()" :color="choosen ? 'accent' : 'primary'" :disabled="uploading">
                    {{ tmpName || $t('select') }} <v-icon right>camera_alt</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 sm4 v-if="!value">
                <v-btn block @click="upload()" :loading="uploading" :disabled="!choosen" :color="choosen ? 'success' : ''">
                    {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 v-if="uploading">
                <v-progress-linear indeterminate rounded />
            </v-flex>

            <v-flex xs12 v-if="value">
                <v-card light outlined tile>
                    <v-card-text>
                        <v-img :src="value.fullPath" :lazy-src="value.lazyPath" />
                    </v-card-text>
                </v-card>
                <v-btn @click="remove()" tile depressed block color="info">
                    {{ $t('remove') }} <v-icon right>delete</v-icon>
                </v-btn>
            </v-flex>

            <input ref="uLf" @input="selected($event.target.files)" accept="image/*" type="file" class="ImGu" />

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'ImageInput',

    props: ['value'],

    data () {
        return {
            tmpName: null,
            fData: null,
            choosen: false,
            uploading: false
        }
    },

    methods: {

        selected (files) {
            this.fData = new FormData()
            this.fData.append('image', files[0], files[0].name)
            this.tmpName = files[0].name
            this.choosen = true
            this.$refs.uLf.value = null
        },

        upload () {
            this.uploading = true
            this.$store.dispatch('image/add', this.fData).then(res => {
                this.$emit('input', res)
            }).catch(r => {
                this.$notify({ type: 'error', text: this.$t('alert.error.save') })
            }).finally(() => {
                this.uploading = false
            })
        },

        remove () {
            this.$emit('input', false)
            this.choosen = false
            this.tmpName = null
            this.fData = null
        }

    },

    i18n: {
        messages: {
            en: {
                select: 'Select File',
                upload: 'Upload',
                remove: 'Remove Image'
            },
            de: {
                select: 'Datei auswählen',
                upload: 'Hochladen',
                remove: 'Bild entfernen'
            }
        }
    }

}
</script>

<style scoped>
.ImGu {
    opacity: 0;
    width: 1px;
    height: 0px;
    display: none;
}
</style>
