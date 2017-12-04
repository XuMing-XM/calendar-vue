import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Config from './config/config.local'
import path from 'path'
import webpack from 'webpack'
export default (env, testNum) => {
    let config = new Config(env, testNum)
    return {
        baseConfig: config,
        webpackConfig: {
            //页面入口文件配置
            entry: {
                vendor: './src/vendor',
                entry: './src/entry.js'
            },
            //入口文件输出配置
            output: {
                filename: config.outputName.jsName,
                path: config.outputName.path,
                publicPath: './'
            },
            module: {
                //加载器配置
                loaders: [{
                    test: /\.js|\.php|\.html$/,
                    exclude: path.resolve(__dirname,config.entryHtml),                     
                    loader: 'string-replace-loader',
                    query: {
                        multiple: config.replace
                    },
                }, {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader?{minimize:true}', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')('>0.1%')
                                ]
                            }
                        }, 'less-loader?includePaths[]=./node_modules']
                    }),
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                    enforce: 'pre'
                }, {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    use: ['vue-loader'],
                }, {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: ['url-loader?limit=10&name=/images/[name].[hash:8].[ext]'],
                }, {
                    test : /\.json$/,
                    use : ['json-loader']
                },{
                    test: /\.php|\.html$/,
                    exclude: path.resolve(__dirname,config.entryHtml),                                         
                    use: ['html-loader'],
                }]
            },
            //插件项
            plugins: [
                new ExtractTextPlugin({
                    filename: config.outputName.cssName,
                    disable: false,
                    allChunks: true
                }),
                new HtmlWebpackPlugin({
                    filename: config.outputName.htmlName,
                    template: config.entryHtml,
                    minify: config.htmlConfig,
                    inject: 'body'
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['vendor'],
                    minChunks: Infinity
                })
            ],
            resolve: {
                //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
                extensions: ['.js', '.json', '.less'],
                alias: {
                    'vue': 'vue/dist/vue.js'
                }
            }

        }
    }
}