var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//----------------------------------
// 引用db.js的pool物件
//----------------------------------
var pool = require('./db.js');

var startPage=1;
var linePerPage=15; 
var navSegments=10;

/* GET home page. */
router.get('/', function(req, res, next) {
    //--------------------------
    // 取得頁碼參數
    //--------------------------    
    var pageNo=parseInt(req.param('pageNo'));

    //--------------------------
    // 如果輸入參數非數字
    //--------------------------
    if(isNaN(pageNo)){
        pageNo=1;
    }

    //--------------------------
    // 如果輸入參數小於1
    //--------------------------
    if(pageNo<1){
        pageNo=1;
    }

    //-----------------------
    // 如果點了上一個區段
    //-----------------------
    if(pageNo<startPage){
        startPage=startPage-navSegments;
    }

    //-----------------------
    // 如果點了下一個區段
    //-----------------------   
    if(pageNo>=(startPage+navSegments)){
        startPage=startPage+navSegments;
    }

    pool.query('select count(*) as cnt from product', function(err, results) {
        if (err)throw err;

        var totalLine=results[0].cnt;
        var totalPage=Math.ceil(totalLine/linePerPage);

        pool.query('select * from product limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
            if (err) {
                res.render('dataNotFound', {});
            }

            if(results.length==0){
                res.render('dataNotFound', {});
            }else{
                var recordNo=(pageNo-1)*linePerPage+1;
                res.render('product', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments});
            }
        }); 
    }); 
});

module.exports = router;

