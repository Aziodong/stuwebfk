/**
 * Created by 董 on 2015/9/23.
 */
var App=require('../..').App;
var middle01=require('./middle01');
var middle02=require('./middle02');

var app=new App();
app.use(middle01);
app.use(middle02);

app.listen(3000);