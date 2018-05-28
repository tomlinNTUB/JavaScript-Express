var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var username = req.session.username;
	if(username==null||username==""){
		username='尚未登入';
	}
		
	res.render('loginForm', {username:username});
});

module.exports = router;


