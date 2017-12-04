import webpack from 'webpack'
import WebpackShellPlugin from 'webpack-shell-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import buildWBConfig from './webpack.base.cofig'
import { argv } from 'yargs'
import copyDir from 'copy-dir'


const type = typeof argv.env === 'string' ? argv.env : ''
let config = null

//test环境
if (/test/.test(type)) {
    let testNum = type.match(/\d+/)[0]
    config = buildWBConfig('test', testNum)
    config.webpackConfig.output.publicPath = config.baseConfig.publicPath
    config.webpackConfig.plugins = (config.webpackConfig.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new WebpackShellPlugin({
            onBuildStart: ['rm -rf build && echo "清除build目录"'],
        }),
    ])
} else if (type == 'pre' || type == 'prod') {
    if(type == 'pre'){
        //预发布环境
        config = buildWBConfig('preProduction', 0)
    }else{
        //正式环境        
        config = buildWBConfig('production', 0)
    }
    config.webpackConfig.output.path += ('/' + config.baseConfig.dateFile)
    config.webpackConfig.output.filename = '[name].[chunkhash:8].js'
    config.webpackConfig.output.chunkFilename = '[name].[chunkhash:8].js'

    //cdn路径
    config.webpackConfig.output.publicPath = config.baseConfig.publicPath

    //添加JS压缩
    config.webpackConfig.plugins = (config.webpackConfig.plugins || []).concat([
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:8].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new WebpackShellPlugin({
            onBuildStart: ['rm -rf build && echo "清除build目录"'],
        }),
    ])
} else {
    // 开发环境
    config = buildWBConfig('development', 0)
    config.webpackConfig.devtool = 'source-map'
    config.webpackConfig.watch = true

    config.webpackConfig.output.publicPath = '/'
    
    // copyDir.sync(projectDir + '/common/build/development/common', projectDir + '/build/development/common')    
    //webpack devServer配置，绑定host测试需要添加allowedHosts

    // config.webpackConfig.devServer = {
    //     host: '0.0.0.0',
    //     allowedHosts: []
    // }
}
export default config.webpackConfig