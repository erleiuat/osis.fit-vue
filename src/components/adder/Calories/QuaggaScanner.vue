<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" block small>
                {{ $t('scanCode') }}
                <v-icon right small>photo_camera</v-icon>
            </v-btn>
        </template>
        <v-card>
            <vcontainer>
                <v-row>
                    <v-col cols="12">
                        <div class="quagga-scanner-container">
                            <v-quagga v-if="!loading && dialog" :onDetected="scanned" :aspectRatio="aspect" :readerSize="size" :readerTypes="types" />
                            <v-progress-linear v-else height="400" indeterminate />
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click="dialog = false" block depressed color="primary">
                            {{ $t('btn.cancel') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </vcontainer>
        </v-card>
    </v-dialog>
</template>

<script>
import foodFavs from '@/store/modules/foodFavorite'

import Vue from 'vue'
import VueQuagga from 'vue-quaggajs'
Vue.use(VueQuagga)

export default {
    name: 'Scanner',

    modules: {
        foodFavs
    },

    data () {
        return {
            code: null,
            dialog: false,
            loading: false,
            size: {
                width: 500,
                height: 500
            },
            aspect: {
                min: 1,
                max: 1
            },
            detecteds: [],
            types: ['ean_reader']
        }
    },

    methods: {

        scanned (data) {
            this.code = data.codeResult.code
            if (!this.loading) {
                this.loading = true
                setTimeout(() => {
                    this.$store.dispatch('foodFavorite/scan', this.code).then(res => {
                        this.$emit('select', res)
                    }).catch(err => {
                        if (err === 'code_not_found') this.$notify({ type: 'warning', title: this.$t('codeNotFound') })
                        else this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: err })
                        this.$emit('select', false)
                    }).finally(() => {
                        this.loading = false
                        this.dialog = false
                    })
                }, 1000)
            }
        }
    },

    i18n: {
        messages: {
            en: {
                codeNotFound: 'Code unknown',
                scanCode: 'Scan Barcode'
            },
            de: {
                codeNotFound: 'Code unbekannt',
                scanCode: 'Barcode scannen'
            }
        }
    }

}
</script>

<style>
.quagga-scanner-container {
    height: 80vh;
    width: 100%;
    overflow: hidden;
    /*border: solid 1px gray;*/
}
.quagga-scanner-container video, .quagga-scanner-container canvas {
    height: 80vh !important;
    width: 100% !important;
}
</style>
