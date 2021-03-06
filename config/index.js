// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        // '/v1':  'http://musicapi.qianqian.com',
        '/bdmusicapi':  {
            target: 'http://musicapi.qianqian.com',
            changeOrigin: true,
            pathRewrite: {
                '^/bdmusicapi': ''
            }
        },
        '/bdsongapi':  {
            target: 'http://music.baidu.com',
            changeOrigin: true,
            pathRewrite: {
                '^/bdsongapi': ''
            }
        },
        '/bdmp3api': {
            target: 'http://zhangmenshiting.baidu.com',
            changeOrigin: true,
            pathRewrite: {
                '^/bdmp3api': ''
            }  
        },
        '/kgsongapi':{
            target: 'http://mobilecdn.kugou.com',
            changeOrigin: true,
            pathRewrite: {
                '^/kgsongapi': ''
            }
        },
        '/kgmp3api': {
            target: 'http://m.kugou.com',
            changeOrigin: true,
            pathRewrite: {
                '^/kgmp3api': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
