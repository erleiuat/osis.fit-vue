/* eslint-disable no-console */

const WebpackAssetsManifest = require('webpack-assets-manifest')
const webpack = require('webpack')

module.exports = {
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
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new WebpackAssetsManifest({
          output: 'manifest.json',
          transform (assets) {
            assets.name = process.env.VUE_APP_NAME
            assets.short_name = process.env.VUE_APP_NAME_SHORT
            assets.background_color = process.env.VUE_APP_THEME_BACKGROUND
            assets.theme_color = process.env.VUE_APP_THEME_COLOR
            assets.start_url = './'
            assets.display = 'standalone'
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
