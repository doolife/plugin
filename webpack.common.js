const path = require('path');
const staticConfig = require('./static.config');

module.exports = {
    entry:{
        index:path.resolve(__dirname, `./src/${staticConfig.path}/js/index.js`),
    },
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    },
                ]
            }
        ]
    }
};