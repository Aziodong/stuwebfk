/**
 * Created by 董 on 2015/10/6.
 */
var fk=require("../..")
,App=fk.App
,download=fk.download
,app=new App
,view=fk.view
,session=fk.session
,fs=require('fs');

app.use(session);//加载session插件
app.use(view(__dirname+"/views"));

app.get("/num",function(req,res){
    req.session=req.session||0;
    req.session+=1;
    res.view("num.html",{title:"num page",num:req.session});
})

app.listen(3000,function(){
    console.log('server startup!');
})