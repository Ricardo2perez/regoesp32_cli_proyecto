const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    filenameHashing: false,
    productionSourceMap: false,
    css: {
        extract: false
    },
    configureWebpack: {
        optimization: {
            splitChunks: false
        }
    },
    pluginOptions: {
        compression: {
            gzip: {
                filename: '[file].gz[query]',
                algorithm: 'gzip',
                include: /\.(js|css|html|svg|json|ico|png)(\?.*)?$/i,
                minRatio: 0.8,
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'RegoEsp32'
                return args
            })
    }
})