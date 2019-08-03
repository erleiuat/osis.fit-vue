<template>
    <v-container grid-list-sm pa-0>
        <v-layout row wrap>

            <v-flex xs12 sm8 v-if="!img.uploaded">
                <v-btn block @click="$refs.uLf.click()" :color="img.choosen ? 'accent' : 'primary'" :disabled="img.uploading">
                    {{ tmpName || $t('select') }} <v-icon right>camera_alt</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 sm4 v-if="!img.uploaded">
                <v-btn block @click="upload()" :loading="img.uploading" :disabled="!img.choosen" :color="img.choosen ? 'success' : ''">
                    {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 v-if="img.uploading">
                <v-progress-linear indeterminate rounded />
            </v-flex>

            <v-flex xs12 v-if="img.uploaded">
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

    props: ['value'],

    data () {
        return {
            tmpName: null,
            fData: null
        }
    },

    computed: {

        img: {

            set (val) {
                console.log('yahaa')
            },
            get () {
                if (this.value) return {
                    choosen: true,
                    uploading: false,
                    uploaded: true,
                    fullPath: this.value.fullPath,
                    lazyPath: this.value.lazyPath
                }
                else return {
                    choosen: false,
                    uploading: false,
                    uploaded: false,
                    fullPath: null,
                    lazyPath: null
                }
            }

        }

    },

    methods: {

        selected (files) {
            this.fData = new FormData()
            this.fData.append('image', files[0], files[0].name)
            this.tmpName = files[0].name
            this.img.choosen = true
            this.$refs.uLf.value = null
        },

        upload () {
            try {
                this.img.uploading = true
                this.$store.dispatch('image/add', this.fData).then(r => {
                    this.$emit('input', r)
                    this.img.fullPath = r.fullPath
                    this.img.lazyPath = r.lazyPath
                    this.img.uploaded = true
                }).catch(r => {
                    console.log(r)

                    this.$notify({ type: 'error', text: this.$t('alert.error.save') })
                }).finally(() => {
                    this.img.uploading = false
                })
            } catch (e) {
                console.log(e)
            }
        },

        remove () {
            this.$emit('input', null)
            this.img.uploaded = false
            this.img.choosen = false
            this.tmpName = null
            this.fData = null
        }

    },

    watch: {
        value (val) {
            console.log(val)
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
