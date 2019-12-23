const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const staticConfig = require('./static.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode:'development',
    devServer:{
        host:'localhost',
        open:true,
    },
    module:{
        rules:[
            {
                test:/\.(mov|mp4|mp3|ogg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:`./media/[name].[ext]`,
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
                            name:`./img/[name].[ext]`,
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:`./src/${staticConfig.path}/index.html`
        }),
        new CopyWebpackPlugin([
            {from:`./src/${staticConfig.path}/img`, to:'img'}
        ])
    ]
});