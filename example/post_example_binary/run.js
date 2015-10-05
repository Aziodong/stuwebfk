/**
 * Created by 董 on 2015/10/5.
 */
var fk=require('../..')
,App=fk.App
,post=fk.post
,fs=require("fs")
,static=fk.static
,app=new App;


app.use(static(__dirname+"/public"));

app.use(post);

app.post("/post",function(req,res){
    //构建文件名
    var storedFileName=req.body.filename.toString()+req.files.img.extName;
    fs.writeFileSync(storedFileName,req.files.img);
    res.write("upload ok!");
    res.end();
});

app.listen(3000,function(){
    console.log("server start!");
})