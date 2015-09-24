/**
 * Created by 董 on 2015/9/23.
 */
//应用程序类，通过new App可以创建一个应用程序

'use strict'
var http=require('http');

module.exports=App;

function App()
{
    var middleList=this._middleList=[];

    var self=this;

    //路由处理器，处理get/post请求的路由
    this._route_post_handles={};
    this._route_get_handles={};

    function handle(req,res) {
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
                console.log(self._route_get_handles);
                console.log(req.url);
                console.log(req.url)
                switch(req.method)
                {
                    case "GET":
                        handle=self._route_get_handles[req.url];
                        break;
                    case "POST":
                        handle=self._route_post_handles[req.url];
                        break;
                }
                if(handle)
                {
                    handle(req,res);
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
    this._route_get_handles[route]=handle;
}
App.prototype.post=function(route,handle)
{
    this._route_post_handles[route]=handle;
}

App.prototype.listen=function()
{
    this._server.listen.apply(this._server,arguments);
}


