/**
 * Created by 董 on 2015/10/5.
 */
/*
 * 下载插件，处理下载请求
 * 下载插件的作用是让客户接收响应时，不是把内容显示在网页上，而是下载到本地。
 * 这个插件知道原理后，其实很简单，通过设置response信息头就可做到。这个插件，我们设置了响应信息头中3个属性，
 * Content-disposition下载的附件文件名称、
 * Content-Type 下载文件的类型 、
 * Content-Length下载文件的大小
 * */
module.exports=function(req,res,next){
    res.download=function(fileName,buf){
        if(Buffer.isBuffer(buf)){
            res.writeHead(200,{
                'Content-disposition':'attachment;filename'+fileName,
                'Content-Type':'application/octet-stream',
                'Content-Length:':buf.length
            });
            res.write(buf);
            res.end();
        }else{
            res.end();
        }
    };
    next();
}