/* eslint-disable no-console */

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const WebpackAssetsManifest = require('webpack-assets-manifest')
const webpack = require('webpack')

module.exports = {
    transpileDependencies: ['vuetify'],
    baseUrl: process.env.BASE_URL,

    pwa: {
        name: process.env.VUE_APP_NAME,
        themeColor: process.env.VUE_APP_THEME_COLOR,
        msTileColor: process.env.VUE_APP_THEME_MSTILE,
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: { skipWaiting: true }
    },

    configureWebpack: () => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ]
        }
    },

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    },

    publicPath: '',

    pluginOptions: {
        cordovaPath: 'src-cordova'
    }
}
/* eslint-enable no-console */
