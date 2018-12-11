const webpack = require('webpack');
const staticConfig = require('./static.config');

const banner = () =>{
    let date = new Date();
    return [
        `@project: webpack`,
        `@author: doolife`,
        '@update: ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    ].join('\n');
};

let src = `${__dirname}/src/${staticConfig.path}`;
let dist = `${__dirname}/dist/${staticConfig.path}`;

module.exports = {
    mode:'development',
    entry:{
        'index':`${src}/js/index.js`,
    },
    output:{
        path:`${dist}/js`,
        filename:'[name].js',
    },
    module:{
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env', {
                        // targets: { node: 'current' }, // 노드일 경우만
                        'targets': {
                            'browsers': [
                                'last 2 versions',
                                'ie >= 10'
                            ]
                        },
                        'modules': false
                    }
                    ],
                    // '@babel/preset-react',
                    // '@babel/preset-stage-0'
                ],
            },
            exclude: ['/node_modules'],
        }],
    },
    plugins:[
        new webpack.BannerPlugin({
            banner: banner()
        })
    ],
};