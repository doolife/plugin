const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const staticConfig = require('./static.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode:'production',
    output:{
        path:path.resolve(__dirname, './dist'),
        publicPath:'/PLUGIN/dist/',
        filename:`${staticConfig.path}/js/[name].js`,
    },
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    },
                ]
            },
            {
                test:/\.(mov|mp4|mp3|ogg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:`${staticConfig.path}/media/[name].[ext]`,
                        }
                    }
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:`${staticConfig.path}/img/[name].[ext]`,
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:`./src/${staticConfig.path}/index.html`,
            filename:`${staticConfig.path}/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename:`${staticConfig.path}/css/[name].css`
        }),
        new CopyWebpackPlugin([
            {from:`./src/${staticConfig.path}/img`, to:`${staticConfig.path}/img`}
        ]),
        new OptimizeCSSAssetsPlugin({})
    ]
});