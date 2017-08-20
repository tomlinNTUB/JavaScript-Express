var express             = require('express'),
    app                 = express(),
    passport            = require('passport'),
    FacebookStrategy    = require('passport-facebook').Strategy,
    session             = require('express-session');
 
var facebookAuth = {
        'clientID'        : '580010732205352', // facebook App ID
        'clientSecret'    : '398a53364f0950eb65e3db844da7e56d', // facebook App Secret
        'callbackURL'     : 'http://105stu.ntub.edu.tw/auth/facebook/callback'
    };
 
 
 
 
// 用來處理從facebook取得的user資料,
// 通常是一些DB動作, 如寫入使用者表格, 或是取回DB中的使用者偏好.
var users = [];
function findUser(id) {
    for(var i=0; i<users.length; i++) {
        if(id === users[i].id) {
            return users[i]
        }
    }
    return null;
}

 
 
// 當passport驗證完成時, 將user(內有id, name, token)存入req.session.passport.user中.
passport.serializeUser(function (user, done) {
	done(null, user);
});

// 將存入req.session.passport.user的內容, 經過某些處理(如讀取db中的偏好值), 存入req.user中.
passport.deserializeUser(function (user, done) {
    // 執行某些處理, 例如加入性別資訊
	// 如: var user=findUser(user.id)...	
    done(null, user); 
});
  
  
  
// facebook passport認證設定
passport.use(new FacebookStrategy({
        "clientID"        : facebookAuth.clientID,
        "clientSecret"    : facebookAuth.clientSecret,
        "callbackURL"     : facebookAuth.callbackURL
    },
    // facebook成功證入時:
    function (token, refreshToken, profile, done) {		
        var currentUser = {
            "id"   : profile.id,
            "name" : profile.displayName,			
            "token": token
        };
		
        return done(null, currentUser);
    })
);
 
 
 
//===========================  
// 啟用session及passport
//=========================== 
app.use(session({
    secret: "ntubimdtomlin",
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
 
 
//=========================== 
// 檢查是否已登入
//=========================== 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.sendStatus(401);
}
 
 
 
//=========================== 
// 主頁面(不需認證)
//=========================== 
app.get("/", function (req, res) {
    res.send("你好.");
});
 
 
 
 
//=========================== 
// 登入頁面(不需認證)
//=========================== 
app.get("/login", function (req, res) {
    res.send("<a href='/auth/facebook'>facebook登入</a>");
});
 
 
 
 
//=========================== 
// 認證
//=========================== 
app.get("/auth/facebook", passport.authenticate("facebook", { scope : ["email"] }));  //向facebook額外需求email

// 認證後的回呼程式
app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect : "/content",
        failureRedirect : "/"
}));
 
 
 
//=================================== 
// 內容頁面(受保護, 需先完成認證)
//=================================== 
app.get("/content", isLoggedIn, function (req, res) {
    res.send("已登入:"+req.user.id + "," + req.user.name);	
});


 
//====================================== 
// 登出頁面(將移除session中的user資訊
//======================================
app.get("/logout", function(req, res) {
    req.logout();
    res.send("已登出");	
});
 
 
 
 
// launch the app
app.listen(80);
console.log("執行中....");
console.log(users);