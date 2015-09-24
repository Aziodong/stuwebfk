/**
 * Created by 董 on 2015/9/24.
 */
/*
* 泛式路由处理
* 匹配泛式
* 1./doc/:id
* 2./doc/title/*
* */
var url=require('url');

module.exports=pathRegexp;

function pathRegexp (path){

    var paramNames=[];

    path = url.parse(path).pathname

        // 这一步是把所有 * 替换成正则表达式[0-9a-zA-Z\-_]*
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"[0-9a-zA-Z\-_]*")

        // 这一步是把所有 :xxx 替换成正则表达式(.*)
        .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,function(){
            var len=arguments.length-3;
            for(var i=0;i<len;i++)
            {
                var avg=arguments[i+1];
                if(typeof avg==="string" && avg[0]!==";")
                {
                    paramNames.push(avg);
                }
            }
            return "([0-9a-zA-Z\-_])";
        })

        .replace(/\/$/,"")

        // 这一步是把所有 / 路径 变为匹配正则表达式的 \/ 的形式
        .replace(/\//g,"\\\/")

    //这一步，通过生成正则表达式  ，前后的 ^ 和 & 顾名思义，要严格匹配整个路径。
    var regexp=new RegExp("^"+path+"\\/?$");
    regexp.paramNames=paramNames;
    return regexp;
};



