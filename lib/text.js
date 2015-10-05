/**
 * Created by 董 on 2015/10/5.
 */
/*
* 文本渲染插件，显示encoded后的代码
* */
module.exports=function(req,res,next){
    res.text=function(txt){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write(txt);
        res.end();
    };
    next();
}