<template>
    <v-dialog v-model="show" v-show="show" :fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition">

        <template v-slot:activator="{ on }">
            <slot v-bind:on="on">
                <v-btn icon v-on="on" color="primary" depressed>
                    <v-icon>add</v-icon>
                </v-btn>
            </slot>
        </template>

        <v-card v-if="show">
            <v-form v-model="rule.valid" ref="form" v-on:submit.prevent>

                <v-toolbar color="primary" class="white--text" v-show="$vuetify.breakpoint.xs">
                    <v-toolbar-title>{{ $t(edit ? 'titleEdit' : 'titleAdd') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon @click="closeEdit()">
                            <v-icon right color="white">close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-card-title class="headline primary white--text" v-show="!$vuetify.breakpoint.xs">
                    {{ $t(edit ? 'titleEdit' : 'titleAdd') }}
                </v-card-title>

                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field :label="$t('ft.title')" v-model="fd.title" :rules="rule.title" type="text" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$t('ft.amount')" v-model="fd.amount" :rules="rule.require" type="number" />
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field :label="$t('calories')" v-model="fd.caloriesPer100" :rules="rule.require" type="number" />
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field :label="$t('image')" v-model="fd.imgUrl" type="text" />
                        </v-flex>

                        <v-flex xs12 v-if="!fd.imgUrl">
                            <v-btn :loading="uploading" large block @click="$refs.uploadfield.click()">
                                {{ $t('uploadImg') }}
                                <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                        </v-flex>

                        <v-flex xs12 v-if="fd.imgUrl">
                            <div class="text-xs-center">
                                <v-img :src="fd.imgUrl" max-height="500" contain></v-img>
                                <v-btn large block @click="resetImg()" class="warning">
                                    {{$t('remove')}}
                                </v-btn>
                            </div>
                        </v-flex>

                    </v-layout>
                </v-card-text>

                <v-divider v-show="!$vuetify.breakpoint.xs" />

                <v-card-actions v-if="$vuetify.breakpoint.xs">
                    <v-btn @click="doit()" block color="primary" :disabled="sending" :loading="sending" type="submit">
                        {{ $t('btn.save') }}
                        <span slot="loader" class="spinning-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>

                <v-card-actions v-else>
                    <v-btn @click="closeEdit()" flat>{{ $t('btn.close') }}</v-btn>
                    <v-spacer />
                    <v-btn @click="doit()" flat :disabled="sending" :loading="sending" type="submit">
                        {{ $t('btn.save') }}
                        <span slot="loader" class="spinning-loader">
                            <v-icon light>cached</v-icon>
                        </span>
                    </v-btn>
                </v-card-actions>

            </v-form>
            <input type="file" ref="uploadfield" @input="filesChange($event.target.files)" accept="image/*" class="input-file">
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'TemplateAdder',

    props: {
        item: Object
    },

    data () {
        return {
            show: false,
            edit: false,
            uploading: false,
            sending: false,
            fd: {
                title: '',
                amount: '',
                caloriesPer100: '',
                imgUrl: '',
                imgLazy: '',
                imgPhrase: ''
            },
            rule: {
                valid: false,
                title: [
                    v => !!v || this.$t('alert.v.require'),
                    v => v.length < 30 || this.$t('alert.v.tooLong', { amount: 30 })
                ],
                require: [
                    v => !!v || this.$t('alert.v.require')
                ]
            }
        }
    },

    mounted () {
        if (this.item && this.item.id) {
            this.edit = true
            this.fd = this.item
            this.fdOrg = Object.assign({}, this.item)
        }
    },

    methods: {

        closeEdit () {
            this.show = false
            if (!this.edit) return
            for (var key in this.fdOrg) this.fd[key] = this.fdOrg[key]
        },

        doit () {
            var vm = this
            vm.$refs.form.validate()
            if (!vm.rule.valid) return false

            var url = 'user/food/add/'
            if (this.edit) url = 'user/food/edit/'

            vm.sending = true
            vm.$http.post(url, vm.fd).then(function (r) {
                if (!vm.edit) vm.$store.state.data.food.push(r.data.object)
                else vm.fdOrg = Object.assign({}, vm.fd)
                vm.$notify({ type: 'success', text: vm.$t('alert.success.save') })
                vm.show = false
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.save') })
            }).finally(function () {
                vm.sending = false
            })
        },

        resetImg () {
            this.fd.imgUrl = null
            this.fd.imgLazy = null
            this.fd.imgPhrase = null
        },

        filesChange (fileList) {
            var vm = this
            if (!fileList.length) return

            var formData = new FormData()
            formData.append('img', fileList[0], fileList[0].name)
            formData.append('public', false)
            var staticPath = process.env.VUE_STATIC_API_URL+'/'+process.env.VUE_STATIC_API_VERSION+'/'

            vm.uploading = true
            vm.$http.post(staticPath + 'image/upload/', formData, { withCredentials: false }).then(function (r) {
                vm.fd.imgUrl = r.data.content.url
                vm.fd.imgLazy = r.data.content.lazy.url
                vm.fd.imgPhrase = r.data.content.phrase
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('uploadError') })
            }).finally(function () {
                vm.uploading = false
            })
        }

    },

    i18n: {
        messages: {
            en: {
                uploadImg: 'Upload Image',
                remove: 'Remove Image',
                titleAdd: 'Add Template',
                titleEdit: 'Edit Template',
                image: 'Image (URL)',
                calories: 'Calories per 100',
                uploadError: 'Upload failed',
                removeImgError: 'Remove failed'
            },
            de: {
                uploadImg: 'Bild hochladen',
                remove: 'Bild entfernen',
                titleAdd: 'Vorlage hinzufügen',
                titleEdit: 'Vorlage bearbeiten',
                image: 'Bild (URL)',
                calories: 'Kalorien pro 100',
                uploadError: 'Hochladen fehlgeschlagen',
                removeImgError: 'Entfernen fehlgeschlagen'
            }
        }
    }

}
</script>

<style scoped>
.input-file {
    opacity: 0;
    width: 1px;
    height: 0px;
    display: none;
}
</style>
