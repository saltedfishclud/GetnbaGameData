var dataArr = require("./exe");
var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");



function fn(callback){
    dataArr(function (data) {
        data.forEach(function (el,index) {
            var html = '';

            http.get(el,(res)=>{
                res.setEncoding("utf-8");
                res.on("data",(chunk)=>{
                    html += chunk;
                });

                res.on("end",()=>{
                    var $ = cheerio.load(html);
                    if($("#artibody")[0]){
                        var con = $("#artibody").html()
                        fs.writeFile(`./public/news/${index}.html`,con,{flag:'a'},function (err) {
                            if (err)throw err;
                            //console.log('新闻生成');
                        });
                    }
                });

            }).on("error", (e) => {
                console.error(`错误: ${e.message}`);
            });
            console.log(`新闻${index}完成`);
        });
        callback(true);
    });
}

module.exports = fn;