/* eslint-disable no-console */

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {

    publicPath: process.env.CORDOVA_PLATFORM ? '' : '/',

    pluginOptions: {
        cordovaPath: 'src-cordova'
    },

    transpileDependencies: ['vuetify'],

    pwa: {
        name: process.env.VUE_APP_NAME,
        themeColor: process.env.VUE_APP_THEME_BACKGROUND,
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
    }

}

/* eslint-enable no-console */
