<template>
    <v-container grid-list-sm pl-0 pr-0>
        <v-card :outlined="!value">
            <transition name="fade" mode="out-in">

                <v-layout row wrap align-center v-if="!value" :style="height?'height:'+height+'px':'min-height:200px'" key="1">

                    <v-flex xs12 v-if="!value && !uploading">
                        <v-card-text class="text-center pb-0">
                            <v-icon x-large>
                                camera_alt
                            </v-icon>
                        </v-card-text>
                        <v-card-text class="pt-0">
                            <v-file-input v-model="file" :label="$t('select')" @change="upload()" :rules="rule" :disabled="uploading" accept="image/jpg, image/png, image/jpeg" prepend-icon="" />
                        </v-card-text>
                    </v-flex>

                    <!--
                    <v-flex xs12 v-if="!value && !uploading" text-center>
                        <v-btn block @click="upload()" :loading="uploading" :disabled="!choosen" :color="choosen ? 'success' : ''" depressed>
                            {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                        </v-btn>
                    </v-flex>
                    -->

                    <v-flex xs12 v-if="uploading">
                        <v-card-text>
                            <v-progress-linear :active="uploading" :value="progress" rounded :indeterminate="progress >= 100" :dark="progress < 50" height="30">
                                <strong v-if="progress < 100">{{ progress }}%</strong>
                                <strong v-else>{{ $t('processing') }}</strong>
                            </v-progress-linear>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row wrap align-center v-if="value && !processing" :style="height?'height:'+height+'px':'min-height:200px'" key="2">
                    <v-flex xs12 pt-0 pb-0>
                        <v-img :src="value.path.medium" :lazy-src="value.path.lazy" :aspect-ratio="ratio" :height="height" :contain="contain">
                            <template v-slot:placeholder>
                                <v-layout fill-height align-center justify-center ma-0>
                                    <v-progress-circular indeterminate />
                                </v-layout>
                            </template>
                            <v-card-title class="lightbox align-start fill-height pa-2">
                                <v-btn icon small @click="remove()" color="white">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                                <v-spacer />
                                <v-btn icon small @click="download()" color="white">
                                    <v-icon>cloud_download</v-icon>
                                </v-btn>
                            </v-card-title>
                        </v-img>
                    </v-flex>
                </v-layout>

            </transition>
        </v-card>
    </v-container>
</template>

<script>
import image from '@/store/modules/image'

export default {
    name: 'ImageInput',

    modules: {
        image
    },

    props: ['value', 'ratio', 'height', 'contain'],

    data () {
        return {
            file: null,
            rule: [
                v => (v ? v.size < (15 * 1000000) : true) || this.$t('maxSize')
            ]
        }
    },

    computed: {
        choosen () {
            if (this.file && this.file.size >= (15 * 1000000)) return false
            return (!!this.file)
        },
        progress () {
            return this.$store.getters['image/progress']
        },
        uploading () {
            if (this.progress) return true
            return false
        },
        processing () {
            if (this.progress && this.progress === 100) return true
            return false
        }
    },

    methods: {

        upload () {
            if (!this.choosen) return

            var fData = new FormData()
            fData.append('image', this.file, this.file.name)

            this.$store.dispatch('image/add', fData).then(res => {
                this.file = null
                this.set = true
                this.$emit('input', res)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save'), text: r })
            })
        },

        download () {
            var element = document.createElement('a')
            element.setAttribute('href', this.value.path.original)
            element.setAttribute('target', '_blank')
            element.setAttribute('download', this.value.name + '.' + this.value.mime)
            element.style.display = 'none'

            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        },

        remove () {
            this.$emit('input', false)
        }

    },

    i18n: {
        messages: {
            en: {
                maxSize: 'Size must be below 15 MB',
                processing: 'Processing image',
                select: 'Select File',
                upload: 'Upload',
                remove: 'Remove Image'
            },
            de: {
                maxSize: 'Die Datei muss kleiner als 15MB sein',
                processing: 'Bild wird verarbeitet',
                select: 'Datei auswählen',
                upload: 'Hochladen',
                remove: 'Bild entfernen'
            }
        }
    }

}
</script>

<style scoped>
.lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
