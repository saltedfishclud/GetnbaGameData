var express = require('express');
var router = express.Router();
var newGet = require("../module/loadData");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/createNews",function (req,res) {
    newGet(function (result) {
        if(result){
            res.send("数据爬取完成");
        }
    });

});

module.exports = router;
