var express = require('express');
var router = express.Router();

//----------------------------------------------
// 載入使用權檢查
//----------------------------------------------
var authorize = require('./authorize.js');
//----------------------------------------------


/* GET home page. */
router.get('/', function(req, res, next) {	
    //------------------------------------------
    // 如尚未登入, 轉至未登入頁面
    //------------------------------------------
    if(!authorize.isPass(req)){
        res.render('NOTloginned', {});
        return;
    }
    //------------------------------------------


    //已登入使用者	
    res.render('important', {userid:req.session.userid, username:req.session.username});
});

module.exports = router;


