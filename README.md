#### loader用于将原内容转为新内容
#### plugins在webpack构建的特定实际注入扩展逻辑改变构建结果

#### loader的使用姿势
1. loader需要配置在module.rules中，rules是一个数组
2. loader的格式为
```js
{
    test:/\.jsx?$/,
    use:"babel-loader"
}
```
或者
```js
{
    test:"\.jsx?$",
    loader:"babel-loader",
    options:{
        ///
    }
}
```

test是匹配规则

#### use字段有3种写法
(1) 字符串：use:"babel-loader"
 (2) 数组，例如处理css文件，use:["style-loader","css-loader"],其中数组的每一项可以是字符串，也可以是对象
```js
 {
    test:/\.jsx?$/,
    use:[{
            loader:"babel-loader"
        }],
    exclude:/node_modules/
}
```
 (3) 对象。
```js
 {
    test:/\.jsx?$/,
    use:{
            loader:"babel-loader"
        },
    exclude:/node_modules/
}
```
#### 编写loader
loader本质是一个函数，接收的参数只有一个，即资源文件的内容。
loader分为同步loader和异步loader
##### 同步loader
1. 使用return
```js
function loader(source){
    // do something
    return source
}
```
2. 使用callback
```js
function loader(source){
    // do something
    this.callback(null,source,map,meta)
}
// 关于this.callback中参数的类型
this.callback(
    err:Error | null,
    content: String | Buffer,
    sourceMap?: SourceMap,
    meta?:any
)
// 调用callback后再return 值会被忽略

```

##### 异步loader
```js
function loader(source){
    console.log("--- loader begin --")
    console.log(source)
    console.log("--- loader end ---")
    const callback = this.async();
    // do anything
    callback(null,source)
}
// 在调用this.async后，return的返回值会被忽略
// 在调用this.async后，再调用this.callback，会将当前loader当做同步loader处理
```

#### loader编写示例
##### 同步版本
```js
function loader(source){
    const time = new Date().toLocaleString()
    const { author = '' } = this.query || {}
    return `
        /**
         ** @author ${author}
         ** @time ${time}
         **/
        ${source}
    `
}
```

##### 异步版本

#### plugin
```js
// webpack处理plugin的原理
//Compiler.js
let { SyncHook } = require("tapable");
class Compiler {
  constructor(config) {
    ...
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    };
    // 如果传递了plugins参数
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this);  //插件内部都由apply方法
      });
    }
    // 插件装载完成
    this.hooks.afterPlugins.call();  //调用钩子
  }
  ...
```
据此可以写一个plugin
```js
class p{
    apply(complier){
        complier.hooks.emit.tap("emit",function(){
            console.log("emit")
        })
    }
}
module.export = {
    entry:"./src/index.js"
    ...
    plugins:[
        new P()
    ]
}
```
#### html插件
htmlWebpackPlugin可以新增html，同时能读取配置文件

#### windows和mac环境兼容
cross-env兼容windows和mac运行环境，是运行跨平台设置和使用环境变量的脚本

#### 关于样式解析
webpack解析css需要loader，从右往左进行，
css：需要style-loader,css-loader
less：less-loader
sass：sass-loader
兼容性：postcss-loader

#### 关于浏览器兼容
可在package.json中声明browserslist字段 或在项目根目录新建.browserslistrc文件
官方文档：https://github.com/browserslist/browserslist

#### 关于图片资源加载
使用url-loader
npm install url-loader -D
安装运行后报错说找不到file-loader
npm install file-loader -D

#### html文件中使用本地图片
npm install html-widthimg-loader -D
使用了这个loader后不能使用ejs模板了，可以删除这个loader配置 将img的src改成变量通过 require方式获取

#### 使用mocker-api 模拟请求

#### 构建性能优化
1. happypack可以多核构建
2. thread-loader
3. webpack.IgnorePlugin 忽略第三方指定目录
4. dllPlugin、dllReferencePlugin
