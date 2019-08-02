/* eslint-disable no-console */

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {
    baseUrl: process.env.BASE_URL,

    pwa: {
        name: 'Osis.fit',
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
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ]
        }
    },

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    }
}

/* eslint-enable no-console */
