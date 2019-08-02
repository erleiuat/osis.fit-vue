<template>
    <v-container grid-list-sm pa-0>
        <v-layout row wrap>

            <v-flex xs8 v-if="!uploaded">
                <v-btn block @click="$refs.uLf.click()" :color="choosen ? 'accent' : 'primary'" :disabled="uploading">
                    {{ name || $t('select') }} <v-icon right>camera_alt</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs4 v-if="!uploaded">
                <v-btn block @click="upload()" :loading="uploading" :disabled="!choosen" :color="choosen ? 'success' : ''">
                    {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 v-if="uploading">
                <v-progress-linear indeterminate rounded />
            </v-flex>

            <v-flex xs12 v-if="uploaded">
                <v-card light outlined tile>
                    <v-card-text>
                        <v-img :src="img.fullPath" :lazy-src="img.lazyPath" />
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

    props: {
        imageID: Object
    },

    data () {
        return {
            name: null,
            fData: null,
            choosen: false,
            uploading: false,
            uploaded: false,
            img: {}
        }
    },

    methods: {

        selected (files) {
            this.fData = new FormData()
            this.fData.append('image', files[0], files[0].name)
            this.name = files[0].name
            this.choosen = true
            this.$refs.uLf.value = null
        },

        upload () {

            this.uploading = true
            this.$store.dispatch('image/add', this.fData).then(r => {
                this.img = r
                this.$emit('input', r.id)
                this.uploaded = true
            }).catch(r => {
                this.$notify({ type: 'error', text: this.$t('alert.error.save') })
            }).finally(() => {
                this.uploading = false
            })

        },

        remove () {
            this.$emit('input', null)
            this.uploaded = false
            this.choosen = false
            this.name = null
            this.fData = null
            this.img = {}
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