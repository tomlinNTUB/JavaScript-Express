var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./db.js');

/* POST home page. */
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數
    var userid=req.param("userid");
    var password=req.param("password");

    pool.query('select * from employee where empNo=? and password=?', [userid, password], function(err, rows, fields) {
        if (err || rows.length==0){ //登入失敗
            req.session.loginPass=false;
            req.session.userid=null; 
            req.session.username=null; 			            
            res.render('index', {username:'登入失敗'});  
        }else{	//登入成功
            req.session.loginPass=true;
            req.session.userid=userid; 	
            req.session.username=rows[0].empName; 	
            res.render('index', {username:req.session.username});   
        }
    });
});

module.exports = router;


