var express = require('express');
var router = express.Router();

//----------------------------
// 引用db.js的pool物件
//----------------------------
var pool = require('./db.js');


//========================
// 處理GET請求
//========================
router.get('/', function(req, res, next) {
    var supplierItems;
    var proTypeItems;

    pool.query('select * from supplier', function(err, results) {       
        if (err) {
            supplierItems=[];
        }else{
            supplierItems=results;
        }

        pool.query('select * from proType', function(err, results) {
            if (err) {
                proTypeItems=[];
            }else{
                proTypeItems=results;
            }
	
            //---------------------------------   
            // 將供應商及產品型態資料一起送出
            //---------------------------------
            res.render('productAddForm', {supplierItems:supplierItems, proTypeItems:proTypeItems});
       }); 
    }); 
});

module.exports = router;


