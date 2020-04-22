class TestPlugin{
    apply(complier){
        complier.hooks.emit.tap("emit",function(){
            console.log("i am TestPlugin")
        })
    }
}
module.exports = TestPlugin;