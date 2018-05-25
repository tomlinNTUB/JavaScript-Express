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
    var customerItems;
    var employeeItems;
	var productItems;

    pool.query('select * from customer', function(err, results) {       
        if (err) {
            customerItems=[];
        }else{
            customerItems=results;
        }

        pool.query('select * from employee', function(err, results) {
            if (err) {
                employeeItems=[];
            }else{
                employeeItems=results;
            }
	
			pool.query('select * from product', function(err, results) {
				if (err) {
					productItems=[];
				}else{
					productItems=results;
				}
	
				//------------------------------------   
				// 將客戶, 員工, 產品資料一起送出
				//------------------------------------
				res.render('exportForm', {customerItems:customerItems, employeeItems:employeeItems, productItems:productItems});
			});				
       }); 
    }); 
});

module.exports = router;
