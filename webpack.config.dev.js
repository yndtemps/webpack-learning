const merge = require('webpack-merge');
const baseWebapckConfig = require('./webpack.config.base')
const TestPlugin = require('./plugins/test-plugin');
// const webpack = require('webpack')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasurePlugin()
let devConfig = merge(baseWebapckConfig,{
    mode:"development",
    // 编译后代码映射源码方式
    devtool:"cheap-module-eval-source-map",
    // devServer的参数也可以写在script中，如 --port=3000 --inline=false
    devServer:{
        port:"3000", // 默认8080
        proxy:{
            "/api":{
                target:"http://localhost:4000",
                // pathRewrite:{
                //     "/api":""
                // }
            }
        },
        quiet:false, // 启用后，除了初始信息外的任何内容不会打印到控制台，意味着webpack的错误和警告不可用
        inline:true, // 默认开启inline，如果设置为false，开启iframe模式
        stats:"errors-only", // 终端仅打印error
        overlay:false, // 默认不启用，启用时会将编译错误信息打印到浏览器中
        clientLogLevel:"error", //日志等级，即控制台的error，warning，info开启哪些
        compress:true, // 是否gzip压缩
        // hot:true // 热更新
    },
    plugins:[
        // if webpack or webpack-dev-server are launched with the --hot option,
        // this plugin will be added automatically
        // new webpack.HotModuleReplacementPlugin(), 
        new TestPlugin(),
        // 提升构建速度
        // new HardSourceWebpackPlugin()
    ]
})

module.exports = smp.wrap(devConfig)