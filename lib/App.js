/**
 * Created by 董 on 2015/9/23.
 */
//应用程序类，通过new App可以创建一个应用程序

'use strict'
var http=require('http');
var pathRegexp=require("./pathRegexp");
var url=require('url');

module.exports=App;

function App()
{
    var middleList=this._middleList=[];

    var self=this;

    //路由处理器，处理get/post请求的路由
    this._route_post_handles=[];
    this._route_get_handles=[];

    function handle(req,res) {
        req.params={};
        var middleIndex = 0;
        var next = function () {
            middleIndex += 1;
            execMiddle();
        }
        var execMiddle = function () {
            var middle = middleList[middleIndex];
            if (middle) {
                middle(req, res, next);
            }
            else {
                var handle;
                var path=url.parse(req.url).pathname;
                var findHandle=function(route_handles)
                {
                    for(var i= 0,len=route_handles.length;i<len;i++)
                    {
                        if(route_handles[i].route.test(path))
                        {
                            route_handles[i].route.paramNames.forEach(function(value,index){
                                req.params[value]=RegExp["$"+(index+1)];
                            });
                            handle=route_handles[i].handle;
                            break;
                        }
                    }
                }
                switch(req.method)
                {
                    case "GET":
                        findHandle(self._route_get_handles);
                        break;
                    case "POST":
                        findHandle(self._route_post_handles);
                        break;
                }
                if(handle)
                {
                    handle(req,res);
                }else
                {
                    res.statusCode=404;
                    res.end();
                }
            }
        }
        execMiddle();
    }
    this._server=http.createServer(handle);
}

App.prototype.use=function(middile)
{
    this._middleList.push(middile);
}

App.prototype.get=function(route,handle)
{
    this._route_get_handles.push({route:pathRegexp(route),handle:handle});
}
App.prototype.post=function(route,handle)
{
    this._route_post_handles.push({route:pathRegexp(route),hanle:handle});
}

App.prototype.listen=function()
{
    this._server.listen.apply(this._server,arguments);
}


