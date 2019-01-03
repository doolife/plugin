const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const staticConfig = require('./static.config');

module.exports = (env, options) => {
    const devMode =  options.mode !== 'production';
    const noneMode = options.mode === 'none';
    return {
        mode:options.mode,
        entry:{
            index:`./src/${staticConfig.path}/js/index.js`,
        },
        output:{
            path:path.resolve(__dirname, './dist'),
            filename:`${staticConfig.path}/js/[name].js`,
            publicPath:'/PLUGIN/dist/'
        },
        devtool : 'inline-source-map',
        devServer: {
            open: true,
            contentBase:path.resolve(__dirname, './dist')
        },
        module:{
            rules: [{
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', {
                            'targets': {
                                'browsers': [
                                    'last 2 versions',
                                    'ie >= 10'
                                ]
                            },
                            'modules': false
                        }],
                    ],
                },
                exclude: ['/node_modules'],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        // minimize: true
                    }
                }]
            },{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                        options: {
                            url: true,
                            // sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            // sourceMap: true
                        }
                    }
                ]
            },{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `${staticConfig.path}/img/[name].[ext]`,
                    }
                }]
            }],
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename:`${staticConfig.path}/css/[name].css`,
            }),
            new HtmlWebPackPlugin({
                template: `./src/${staticConfig.path}/index.html`,
                filename: `${staticConfig.path}/index.html`,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};