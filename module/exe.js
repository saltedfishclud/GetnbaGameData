const http = require("http");
const cheerio = require("cheerio");
const url = "http://sports.sina.com.cn/nba/1.shtml";

function netGet(callback){
    http.get(url, (res) => {
        let html = "";
        res.setEncoding("utf-8");

        res.on("data",(chunk)=>{
            html += chunk;
        });

        res.on("end",()=>{
            var $ = cheerio.load(html);
            var urlArr = [];

            // $("#S_Cont_11 a").each(function(){
            //     urlArr.push($(this).attr("href")) ;
            // });
            (function rec(page){
                page++;
                if($(`#S_Cont_1${page}`)[0]){
                    rec(page);
                    $(`#S_Cont_1${page} a`).each(function () {
                        urlArr.push($(this).attr("href")) ;
                    });
                }
            })(0);
            callback(urlArr);
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
}

module.exports = netGet;
