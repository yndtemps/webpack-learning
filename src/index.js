import "./index.less"
// import popup from "popup";
import popup from "@/popup";
import $ from 'jquery';
// 局部刷新
if(module && module.hot){
    module.hot.accept()
}
popup();
const first = [1,2,3].find(a=>a>2)

console.log("first",first)

// 测试跨域 需开启server文件夹下的服务
// fetch("/api/user").then(res=>res.json()).then(data=>console.log("res",data)).catch(err=>console.error(err))

// 测试 $ 和 按需加载
$('#btn').click(function(){
    // 当webpack遇到 import(xxx)这样的语法时，会以xxx为入口新生成一个chunk，代码执行到import所在语句，才会加载chunk对应文件
    import('./handle').then(fn=>fn.default())
})
// console.log("__dirname",__dirname)
// console.log("__filename",__filename);
// console.log("process.cwd()",process.cwd());



// const path = require("path");
// console.log(path.join(__dirname,"/a/b"));
// console.log(path.join(__dirname,"./a/b"));
// console.log(path.join("../a/b","/c/d"));


// console.log(path.resolve(__dirname,"/a/b"));
// console.log(path.resolve(__dirname,"./a/b"));
// console.log(path.resolve("../a/b","/c/d"));



