var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./db.js');


//============================
// 處理 POST 請求
//============================
router.post('/', function(req, res) {
    // 取得使用者傳來的參數
    var proNo=req.param("proNo");
    var proName=req.param("proName");
    var price=req.param("price");
    var stockAmt=req.param("stockAmt");
    var inventoryDate=req.param("inventoryDate");	

    // 建立一個新資料物件
    var newData={        
        proName:proName,
        price:price,
        stockAmt:stockAmt,
        inventoryDate:inventoryDate
    }  
	
    pool.query('UPDATE product SET ? WHERE proNo = ?', [newData, proNo] , function(err, rows, fields) {
        if (err){
            res.render('modifyFail', {});   
        }else{
            res.render('modifySuccess', {}); 
        }
    });    	
});

module.exports = router;
