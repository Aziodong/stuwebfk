/**
 * Created by 董 on 2015/9/23.
 */
var fk=require('../..');
var App=fk.App;
var static_middle=fk.static;

var app=new App();

//加载static中间件
app.use(static_middle(__dirname+"/public"));

app.get(function(req,res){
    res.write("I'm get method!");
    res.end();
});

app.post(function(req,res){
    res.write("I'm post method!");
    res.end();
});

app.listen(3000);
