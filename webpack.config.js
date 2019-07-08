const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
    return {
        entry: () =>  {
            return {
                app: ['@babel/polyfill', path.resolve(__dirname, `./projects/${env.project}/client.jsx`)]
            };
        },
        output: {
            publicPath: `../scripts/`,
            path: path.resolve(__dirname, `assets/${env.project}/scripts`),//   __dirname, //path.join(__dirname, '../assets/scripts'),
            filename: '[name].js',
            chunkFilename: '[name]_[chunkhash:5].js'
        },
        // devtool: 'source-map',
        // devServer: {
        //     contentBase: "./public", //本地服务器所加载的页面所在的目录
        //     historyApiFallback: true, //不跳转
        //     inline: true,
        //     hot: true
        // },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                      }
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(sc|sa)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                            },
                        }, {
                            loader: 'sass-loader',
                            options: {
                                javascriptEnabled: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    exclude: /node_modules/,
                    use: 'file-loader?name=../images/[name]_[hash:5].[ext]'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss', 'jpg', 'jpeg', 'png', 'gif', 'svg']
        },
        plugins: [
            new MiniCssExtractPlugin({
              // filename: '[name].[hash:5].css',
              filename: `../styles/[name].css`,
              chunkFilename: '[id].css'
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./reactFest.json')
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            new optimizeCss({
              cssProcessorOptions: {
                map: { inline: false },
              }
            })
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // }),
            // new CopyWebpackPlugin([
                // { from: '../favicons', to: '../favicons' },
                // { from: '../font', to: '../font' }
            // ])
        ],
        node: {
            fs: 'empty'
        }
        
    }
};