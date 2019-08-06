<template>
    <v-container grid-list-sm pl-0 pr-0>
        <v-layout row wrap align-center>

            <v-flex xs12 sm8 v-if="!value && !uploading">
                <v-file-input v-model="file" :label="$t('select')" :disabled="uploading" prepend-icon="camera_alt" accept="image/jpg, image/png, image/jpeg" />
            </v-flex>

            <v-flex xs12 sm8 v-show="uploading">
                <v-progress-linear :active="uploading" :value="progress" rounded :indeterminate="progress >= 100" :dark="progress < 50" height="30">
                    <strong v-if="progress < 100">{{ progress }}%</strong>
                    <strong v-else>{{ $t('processing') }}</strong>
                </v-progress-linear>
            </v-flex>

            <v-flex xs12 sm4 v-if="!value" text-center>
                <v-btn @click="upload()" :loading="uploading" :disabled="!choosen" :color="choosen ? 'success' : ''" depressed>
                    {{ $t('upload') }} <v-icon right>cloud_upload</v-icon>
                </v-btn>
            </v-flex>

            <transition name="fade">
                <v-flex xs12 v-if="value && !processing">
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
            file: null
        }
    },

    computed: {
        choosen () {
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
            var fData = new FormData()
            fData.append('image', this.file, this.file.name)

            this.$store.dispatch('image/add', fData).then(res => {
                this.file = null
                this.$emit('input', res)
            }).catch(r => {
                this.$notify({ type: 'error', title: this.$t('alert.error.save') })
            })
        },

        remove () {
            this.$emit('input', false)
        }

    },

    i18n: {
        messages: {
            en: {
                processing: 'Processing image',
                select: 'Select File',
                upload: 'Upload',
                remove: 'Remove Image'
            },
            de: {
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
.ImGu {
    opacity: 0;
    width: 1px;
    height: 0px;
    display: none;
}
</style>
