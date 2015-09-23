/**
 * Created by 董 on 2015/9/23.
 */
'use strict'

var http=require('http');
var fs=require('fs');
var url=require('url');

var server=http.createServer();

server.on('request',handle);

server.listen(3000,function(){
    console.log('服务器已启动');
});

function handle(request,response){
    var callback=function(err,data)
    {
        if(err)
        {
            response.statuCode=404;
        }else
        {
            response.write(data);
        }
        response.end();
    };
    var path=url2path(request.url);
    fs.readFile(__dirname+"/public/"+path,callback);
};

function url2path(url_str){
    var urlObj=url.parse(url_str);
    var path=urlObj.path;
    return path;
}