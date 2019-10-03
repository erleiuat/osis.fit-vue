<template>
    <v-btn @click="scan" color="primary" block small :loading="loading">
        {{ $t('scanCode') }}
        <v-icon right small>photo_camera</v-icon>
    </v-btn>
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

        scan () {
            /* eslint-disable no-undef */
            var vm = this

            cordova.plugins.barcodeScanner.scan(result => {
                if (result.cancelled) return
                vm.scanned(result.text)
            }, error => {
                alert('Failed: ' + error)
            }, {
                preferFrontCamera: false,
                showFlipCameraButton: true,
                showTorchButton: true,
                torchOn: false,
                saveHistory: true,
                prompt: this.$t('placeText'),
                resultDisplayDuration: 500,
                orientation: 'portrait',
                disableAnimations: true,
                disableSuccessBeep: false
            })
            /* eslint-enable no-undef */
        },

        scanned (data) {
            this.code = data

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
                codeNotFound: 'Code unknown',
                scanCode: 'Scan Barcode',
                placeText: 'Place a barcode inside the scan area'
            },
            de: {
                codeNotFound: 'Code unbekannt',
                scanCode: 'Barcode scannen',
                placeText: 'Platzieren Sie einen Barcode innerhalb des Scanbereichs'
            }
        }
    }

}
</script>
