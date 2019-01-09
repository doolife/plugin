const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const staticConfig = require('./static.config');

module.exports = merge(common, {
    mode:'development',
    devServer: {
        host: 'localhost',
        open: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: `./src/${staticConfig.path}/index.html`,
            filename: 'index.html',
        })
    ]
});