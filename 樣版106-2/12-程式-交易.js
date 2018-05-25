var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./db.js');

//========================
// 處理POST請求
//========================
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數(主訂單)
    var ordNo=req.param("ordNo");
    var cusNo=req.param("cusNo");
    var empNo=req.param("empNo");
    var ordDate=req.param("ordDate");	
    var transFee=req.param("transFee");
	
    //取得使用者傳來的參數(訂單明細, 陣列)
	var proNo=req.param("proNo");
	var amt=req.param("amt");


	pool.getConnection(function(err, connection) {
		//=============
		// 交易開始
		//=============
		connection.beginTransaction(function(err) {
			if (err) { 
				connection.rollback(function() {
					connection.release();
					res.render('transactionRollback', {});
				});
			} else {
				//增加交易主檔記錄
				
				//建立一個主訂單資料物件
				var newMaster={
					ordNo:ordNo,
					cusNo:cusNo,
					empNo:empNo,
					ordDate:ordDate,
					transFee:transFee
				}	
				
				connection.query("INSERT INTO ordMaster SET ?", newMaster, function(err, results, fields) {
					//======================
					// 交易失敗, Rollback
					//======================				
					if (err) {
						connection.rollback(function() {
							connection.release();
							res.render('transactionRollback', {});
						});
					} else {	
						//增加交易明細記錄
						var tot=0;
						for(var i=1; i<proNo.length; i++){
							//建立一個明細訂單資料物件
							var newDetails={
								ordNo:ordNo,
								proNo:proNo[i],
								amt:amt[i]							
							}				
						
							connection.query("INSERT INTO ordDetails SET ?", newDetails, function(err, results, fields) {
								//======================
								// 交易失敗, Rollback
								//======================				
								if (err) {
									connection.rollback(function() {
										connection.release();
										res.render('transactionRollback', {});
									});	
								} else {
									tot=tot+1;
									if(tot==proNo.length-1){
										connection.commit(function(err) {
											if (err) {
												connection.rollback(function() {
													connection.release();
													res.render('transactionRollback', {});
												});
											} else {
												//======================
												// 交易成功, Commit
												//======================										
												connection.release();
												res.render('transactionSuccess', {});
											}
										});
									}	
								}	
							});
						}	
					}
				});
			}    
		});
	});		
});

module.exports = router;

