var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./db.js');

//------------------
// POST 方法
//------------------
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數
    var proNo=req.param("proNo");
    var proName=req.param("proName");
    var price=req.param("price");
    var stockAmt=req.param("stockAmt");
    var inventoryDate=req.param("inventoryDate");
	
    //建立一個新資料物件
    var newData={
        proNo:proNo,
        proName:proName,
        price:price,
        stockAmt:stockAmt,
        inventoryDate:inventoryDate
    }	
	
    pool.query('INSERT INTO product SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('addFail', {});     //新增失敗
        }else{
            res.render('addSuccess', {});  //新增成功
        }
    });
});

module.exports = router;



