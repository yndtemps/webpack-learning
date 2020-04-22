const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const isDev = process.env.NODE_ENV === "development"
const config = require("./public/config")[isDev?"dev":"build"]
module.exports = {
    entry:{
        index:"./src/index.js",
        login:"./src/login.js"
    }, // 字符串，数组或对象
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].[hash:6].js",
        publicPath:"/"
    },
    resolve:{
        modules:["./src/components","node_modules"], // 从左往右依次查找，webpack查找模块的方式
        // 配置别名
        alias:{
            "@":path.resolve(__dirname,"src/components")
        },
        // extensions:["js","json"], // 查找扩展名的方式，import from 不写扩展名时从左往右查找
        enforceExtension:false // 是否强制在导入语句时写文件后缀
    },
    externals:{
        // 类似jquery通过script从cdn引入后，全局中就有了jquery变量
        'jquery':'jQuery'
    },
    module:{
        // noParse:/jquery|lodash/, // 第三方模块没有commonJS和amd规范，不需要转换
        rules:[
            {
                test:/\.jsx?$/,
                use:[{
                    loader:path.resolve(__dirname,"loader/banner-loader"),
                    options:{
                        author:"lmj"
                    }
                },"babel-loader?cacheDirectory"],
                include:[path.resolve(__dirname,'src')]
                // exclude:/node_modules/
            },
            {
                test:/\.(le|c)ss$/,
                use:["style-loader","css-loader",{
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
            {
                test:/\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                loader:"url-loader",
                options:{
                    limit:10240, // 资源小于10k，会将资源转为base64，超过10k会拷贝到dist目录
                    esModule:false, // 设置为false，可以使用 src = require('xxx.jpg')方式
                    name:'[name]_[hash:6].[ext]', // 设置文件名为原始名加 哈希值6位
                    outputPath:"assets"
                },
                exclude:/node_modules/
            },
            // {
            //     test:/\.html$/,
            //     loader:"html-withimg-loader",
            //     options:{
            //         esModule:true
            //     }
            // }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            filename:"index.html",// 打包后的文件名
            chunks:["index"], // 仅引入对应的文件
            // excludeChunks:[], // 不引入的文件
            minify:{
                removeAttributeQuotes:false,
                collapseWhitespace:false
            },
            config:config.template
        }),
        new HtmlWebpackPlugin({
            template:"./public/login.html",
            filename:"login.html",// 打包后的文件名,不写默认index.html
            chunks:["login"]
        }),
        // 静态资源拷贝
        new CopyWebpackPlugin([{
            from:'public/js/*.js',
            to:path.resolve(__dirname,'dist','js'),
            flatten:true // 设置为true，只拷贝文件，不会把文件夹路径也拷贝
        }]),
    ]
}