const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const staticConfig = require('./static.config');

module.exports = (env, options) => {
    const devMode =  options.mode !== 'production';
    const noneMode = options.mode === 'none';
    return {
        entry:{
            index:`./src/${staticConfig.path}/js/index.js`,
        },
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename:`${staticConfig.path}/js/[name].js`
        },
        devtool : 'inline-source-map',
        devServer: {
            open: true,
            contentBase:path.resolve(__dirname, 'dist')
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
            },{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context:path.resolve(__dirname, "src"),
                        publicPath: noneMode ? '' : `/PLUGIN/dist`,
                    }
                }]
            }],
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename:`${staticConfig.path}/css/[name].css`,
            }),
            new HtmlWebPackPlugin({
                template: `./example/${staticConfig.path}/index.html`,
                filename: noneMode ? 'index.html' : `${staticConfig.path}/index.html`
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};