/* eslint-disable no-console */

const SitemapPlugin = require('sitemap-webpack-plugin').default
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const routerPaths = require('./src/router/routes/').map(r => r.path).filter(p => !p.match(/\*/))

function flatten (array, prn) {
    var allRoutes = []
    array.forEach(function (parentRoute) {
        var inPoint = prn + parentRoute.path + '/'
        allRoutes.push(prn + parentRoute.path.split('/:')[0])
        for (var key in parentRoute)
            if (typeof parentRoute[key] === 'object')
                if (parentRoute[key].length) {
                    var childs = flatten(parentRoute[key], inPoint)
                    allRoutes = allRoutes.concat(childs)
                }
    })
    return allRoutes
}

const routerPaths = flatten(require('./src/router/routes/'), '').filter(p => !p.match(/\*/))

console.log('SITEMAP:')
console.log(routerPaths)

module.exports = {
    baseUrl: process.env.BASE_URL,

    pwa: {
        name: 'Osis.fit',
        themeColor: '#2DC7FF',
        msTileColor: '#2b5797',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: { skipWaiting: true }
    },

    configureWebpack: () => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                new VuetifyLoaderPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                new SitemapPlugin(
                    'https://www.osis.fit',
                    routerPaths,
                    {
                        fileName: 'sitemap.xml',
                        lastMod: true,
                        changeFreq: 'daily'
                    }
                )
            ]
        }
    },

    chainWebpack: config => {
        config.plugins.delete('prefetch')
    }
}

/* eslint-enable no-console */
