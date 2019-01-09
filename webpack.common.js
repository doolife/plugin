const path = require('path');
const staticConfig = require('./static.config');

module.exports = {
    entry:{
        index: `./src/${staticConfig.path}/js/index.js`,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        filename: `${staticConfig.path}/js/[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${staticConfig.path}/img/[name].[ext]`,
                        }
                    }
                ]
            }
        ]
    }
};