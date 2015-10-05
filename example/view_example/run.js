/**
 * Created by 董 on 2015/10/5.
 */
var fk=require("../..")
,App=fk.App
,view=fk.view
,app=new App;

app.use(view(__dirname+"/views"));

app.get("/",function(req,res){
    res.view("index.html",{title:"index page",name:"leo"});
})

app.get("/about",function(req,res){
    var info = [
        ["Name","Leo"],
        ["Tel","213442322"],
        ["Card","322232"]
    ]
    res.view('about.html',{title:"about me info",info:info});
})

app.listen(3000,function(){
    console.log("server start up!");
});