<template>
    <vcontainer v-if="show">
        <v-row>
            <v-col cols="12">
                <v-btn @click="show = !show" block depressed>
                    {{ $t('btn.close') }}
                </v-btn>
            </v-col>
            <v-col cols="12">
                <div class="quagga-scanner-container">
                    <v-quagga v-if="!loading" :onDetected="scanned" :aspectRatio="aspect" :readerSize="size" :readerTypes="types" />
                    <v-progress-linear v-else height="400" indeterminate />
                </div>
            </v-col>
        </v-row>
    </vcontainer>
</template>

<script>
import foodFavs from '@/store/modules/foodFavorite'

export default {
    name: 'Scanner',

    modules: {
        foodFavs
    },

    props: ['show'],

    data () {
        return {
            code: null,
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
                    })
                }, 1000)
            }
        }

    },

    i18n: {
        messages: {
            en: {
                codeNotFound: 'Code unknown'
            },
            de: {
                codeNotFound: 'Code unbekannt'
            }
        }
    }

}
</script>

<style>
.quagga-scanner-container {
    height: 400px;
    width: 100%;
    overflow: hidden;
    border: solid 1px gray;
}
.quagga-scanner-container video, .quagga-scanner-container canvas {
    height: 400px !important;
    width: 100% !important;
}
</style>
