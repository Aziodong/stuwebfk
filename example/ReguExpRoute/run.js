/**
 * Created by 董 on 2015/9/24.
 */
var App=require('../..').App;

var app=new App();

app.get('/about',function(req,res){
    res.write('my name is acuzio');
    res.end();
});

app.get('/contact/*/:id/ok',function(req,res){
    res.write('contact me');
    res.end();
});

app.listen(3000,function(){
    console.log("server start");
})