var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.loginPass=false;
    req.session.userid=null; 	
    req.session.username=null; 		
    res.render('index', {username:'已登出'});  
});

module.exports = router;


