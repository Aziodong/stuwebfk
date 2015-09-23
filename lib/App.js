/**
 * Created by 董 on 2015/9/23.
 */
//应用程序类，通过new App可以创建一个应用程序

'use strict'
var http=require('http');

function App()
{
    var middleList=this._middleList=[];

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

App.prototype.listen=function()
{
    this._server.listen.apply(this._server,arguments);
}


