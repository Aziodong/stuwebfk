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
    //处理GET/POST请求的函数
    this._getHandle=null;
    this._postHandle=null;

    function handle(req,res)
    {
        if(middleList.length>0)
        {
            var middleIndex=0;
            var next=function()
            {
                middleIndex+=1;
                execMiddle();
            }
            var execMiddle=function()
            {
                var middle=middleList[middleIndex];
                if(middle)
                {
                    middle(req,res,next);
                }
                else
                {
                    switch(req.method)
                    {
                        case "GET":
                            if(self._getHandle)
                            {
                                self._getHandle(req,res);
                            }
                            break;
                        case "POST":
                            if(self._postHandle)
                            {
                                self._postHandle(req,res);
                            }
                            break;
                    }
                }
            }
            execMiddle();
        }
    }
    this._server=http.createServer(handle);
}

App.prototype.use=function(middile)
{
    this._middleList.push(middile);
}

App.prototype.get=function(handle)
{
    this._getHandle=handle;
}
App.prototype.post=function(handle)
{
    this._postHandle=handle;
}

App.prototype.listen=function()
{
    this._server.listen.apply(this._server,arguments);
}


