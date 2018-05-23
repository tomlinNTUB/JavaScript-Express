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
    var pno = req.param("proNo").trim();  //取得傳入參數
	
    pool.query('select * from product where proNo = ?', [pno], function (error, results, fields) {
        if (error||results.length==0){
            res.render('dataNotFound', {});  //轉到找不到資料的畫面
        }else{
			//------------------------------------------------------
			//將取得的inventoryDate轉成YYYY-MM-DD型式
			//------------------------------------------------------
			var theDate=new Date(results[0].inventoryDate);
			var year = theDate.getFullYear();
			var month = theDate.getMonth()+1;
			var day = theDate.getDate();

			if (day < 10) {
			  day = '0' + day;
			}
			if (month < 10) {
			  month = '0' + month;
			}

			results[0].inventoryDate = year + '-' + month + '-' + day;
			//------------------------------------------------------
			
            res.render('productModifyForm', {items:results});  //轉到顯示資料的畫面
        }       
    });
});

module.exports = router;
