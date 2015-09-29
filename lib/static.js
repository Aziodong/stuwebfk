/**
 * Created by 董 on 2015/9/23.
 */
//静态资源的中间件,用于处理客户端对于静态文件的请求

var url=require('url');
var fs=require('fs');

function url2path(url_str){
    var urlObj=url.parse(url_str);
    var path=urlObj.path;
    return path;
}

module.exports=function static(parent_path){
    return function(req,res,next){
        var path=url2path(req.url);
        var callback=function(err,data)
        {
            if(err)
            {
                res.statuCode=404;
                //找不到资源直接next
                next();
            }else
            {
                res.write(data);
                res.end();
            }
        }
        fs.readFile(parent_path+path,callback);
    }
}