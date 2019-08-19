/* eslint-disable no-console */

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackAssetsManifest = require('webpack-assets-manifest')
const webpack = require('webpack')

module.exports = {
    baseUrl: process.env.BASE_URL,

    pwa: {
        name: process.env.VUE_APP_PWA_NAME,
        themeColor: '#45B0FF',
        msTileColor: '#2b5797',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: { skipWaiting: true }
    },

    configureWebpack: () => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                new WebpackAssetsManifest({
                    output: 'manifest.json',
                    transform (assets) {
                        assets.name = process.env.VUE_APP_PWA_NAME
                        assets.short_name = process.env.VUE_APP_PWA_NAME
                        assets.start_url = './'
                        assets.display = 'standalone'
                        assets.background_color = '#FFFFFF'
                        assets.theme_color = '#FFFFFF'

                        assets.icons = [
                            {
                                src: './img/icons/android-chrome-192x192.png',
                                sizes: '192x192',
                                type: 'image/png'
                            },
                            {
                                src: './img/icons/android-chrome-512x512.png',
                                sizes: '512x512',
                                type: 'image/png'
                            }
                        ]
                    }
                })
            ]
        }
    },

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    }
}

/* eslint-enable no-console */
