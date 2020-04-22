const merge = require('webpack-merge');
const baseWebapckConfig = require('./webpack.config.base')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩使用MiniCssExtractPlugin插件后的css
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独抽离css
const path = require("path");

module.exports = merge(baseWebapckConfig,{
    mode:"production",
    module:{
        rules:[
            {
                test:/\.(le|c)ss$/,
                use:[MiniCssExtractPlugin.loader,"css-loader",{
                    loader:"postcss-loader",
                    options:{
                        plugins:function(){
                            return [
                                require("autoprefixer")({
                                    "overrideBrowserlist":[">0.25%","not dead"]
                                })
                            ]
                        }
                    }
                },"less-loader"],
                exclude:/node_modules/
            },
        ]
    },
    plugins:[
        // clean 自动获取output路径
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns:["!dll"]
        }),
        // 由于webpack把资源都打包成一个js，有时候js文件太大，影响加载速度；有时是为了缓存（如只有js部分改动）
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new OptimizeCssPlugin()
    ]
})