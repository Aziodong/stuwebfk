/**
 * Created by 董 on 2015/9/24.
 */
var App=require('../..').App;
var static=require('../..').static;
var app=new App();

app.use(static('/public'));

app.get('/about.html',function(req,res){
    res.write('hello');
    res.end();
});

app.get('/about',function(req,res){
    res.write("my name is acuzio");
    res.end();
});

app.get('/contact',function(req,res){
    res.write('my qq 242342342342');
    res.end();
});

app.listen(3000,function(){
    console.log('server start');
});