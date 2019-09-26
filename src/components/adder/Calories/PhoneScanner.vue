<template>
    <v-btn @click="scan" block small outlined>
        {{ $t('scanCode') }}
        <v-icon right>photo_camera</v-icon>
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
            console.log(JSON.stringify(cordova.plugin))
            cordova.plugin.barcodeScanner.scan(
                function (result) {
                    alert('We got a barcode\n' +
                        'Result: ' + result.text + '\n' +
                        'Format: ' + result.format + '\n' +
                        'Cancelled: ' + result.cancelled)
                },
                function (error) {
                    alert('Scanning failed: ' + error)
                },
                {
                    preferFrontCamera: true, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: false, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt: 'Place a barcode inside the scan area', // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    // formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
            )
            /* eslint-enable no-undef */
        },

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
