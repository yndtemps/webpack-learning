const express = require('express');

let app = express();
app.get("/api/user",(req,res)=>{
    res.send({name:"lmj"})
})

app.listen(4000)