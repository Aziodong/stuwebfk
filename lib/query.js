/**
 * Created by 董 on 2015/9/24.
 */
var url=require('url');
var qs=require('querystring');

function query(req,res,next){
    var querystring=url.parse(req.url).query;
    try{
        var queryObj=qs.parse(querystring);
        req.query=queryObj||{}
    }catch(e){
        req.query={};
    }
    next();
};

module.exports=query;