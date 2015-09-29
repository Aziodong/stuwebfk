/**
 * Created by 董 on 2015/9/29.
 */
var fk = require("../..")
    ,App = fk.App
    ,app = new App,
    static=fk.static
    post=fk.post;

var fs=require("fs");

app.use(static(__dirname+"/public"));
app.use(post);
app.post("/post",function(req,res){
    fs.writeFile(__dirname+"/public/file.txt",req.files.txt,function(){
        res.write("OK!");
        res.end();
    })
})


app.listen(3000,function(){
    console.log("server startup!");
})