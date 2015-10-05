/**
 * Created by 董 on 2015/10/5.
 */
/*
 * 跳转插件,处理302跳转请求
 * */
module.exports=function(req,res,next){
    res.redirect=function(url){
        res.writeHead(302,{Location:location(req,url)});
        res.end();
    };
    next();
};

function location(req,rul){
    //如果是完整的URL
    if(/^http:\/\//.test(url)){
        return url;
    }else if(/^\//.test(url)){//如果是本地根目录网址
        return 'http://'+req.headers.host+url;
    }else{
        return 'http://'+req.headers.host+'/'+req.url+'/'+url;
    }
}