<template>
    <v-container grid-list-sm pl-0 pr-0>
        <v-layout row wrap align-center>

            <v-flex xs12 sm8 v-if="!value">
                <v-file-input v-model="file" :label="$t('select')" prepend-icon="camera_alt" accept="image/jpg, image/png, image/jpeg" />
            </v-flex>

            <v-flex xs12 sm4 v-if="!value" text-center>
                <v-btn @click="upload()" :loading="uploading" :disabled="!choosen" :color="choosen ? 'success' : ''">
                    {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 v-if="uploading">
                <v-progress-linear indeterminate rounded />
            </v-flex>

            <transition name="fade">
                <v-flex xs12 v-if="value">
                    <v-card light outlined tile>
                        <v-img :src="value.path.large" :lazy-src="require('@/assets/img/loading.png')">
                            <template v-slot:placeholder>
                                <v-layout fill-height align-center justify-center ma-0>
                                    <v-progress-circular indeterminate></v-progress-circular>
                                </v-layout>
                            </template>
                        </v-img>
                        <v-btn @click="remove()" tile depressed block color="info">
                            {{ $t('remove') }} <v-icon right>delete</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>
            </transition>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'ImageInput',

    props: ['value'],

    data () {
        return {
            file: null,
            uploading: false
        }
    },

    computed: {
        choosen () {
            return (!!this.file)
        }
    },

    methods: {

        upload () {

            var fData = new FormData()
            fData.append('image', this.file, this.file.name)

            this.uploading = true
            this.$store.dispatch('image/add', fData).then(res => {
                this.file = null
                this.$emit('input', res)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            }).finally(() => {
                this.uploading = false
            })
        },

        remove () {
            this.$emit('input', false)
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
