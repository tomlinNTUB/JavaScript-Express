# D07-3 使用Google OAuth2登入

```
npm install passport --save
npm install passport-google-oauth20 --save
npm install express-session --save
```

### (1) 登入Google cloud platform, https://console.developers.google.com/
```
註: 以下選擇「建立OAuth用戶端ID」後, 會再被要求選擇「應用程式類型」, 此時選擇「網頁應用程式」.
```

![GitHub Logo](/imgs/A-01.jpg)

### (2) 建立OAuth用戶端ID
```
註: (1) 以下「已授櫂的JavaScript來源」可以不填;

    (2) 以下「已授櫂的重新導向URI」, 如果網站將上傳至Heroku, 可以寫成:
        https://[Heroku上的應用程式名稱].herokuapp.com/auth/google/callback
```

![GitHub Logo](/imgs/A-02.jpg)

### (3) 得到用戶端ID及用戶端密碼
![GitHub Logo](/imgs/A-03.jpg)


### 檔案放置方式
```
 <web>
   |
   |__ <views>
   |      |__ index.ejs     (修改)
   |
   |__ <routes>
   |      |__ checkAuth.js  (自行增加)    
   |
   |__ app.js   (修改)  
```

### (1) 修改index.ejs

```
將其中的:
<li><a href="/user/login/form">登入</a></li>

改成:
<li><a href="/user/login">登入</a></li>
```

### (2) checkAuth.js

``` js
var express = require('express');
var router = express.Router();

//處理GET, POST, PUT, DELETE等所有請求
router.all('/', function(req, res, next) {
    //檢查是否有session註記
    var id;

    try{
        id = req.session.passport.user.id;
    }catch(err){
        id = null;        
    }

    if(id===null || id===undefined){
        res.redirect('/user/login');  //導向登入畫面        
    }else{
        next();  //執行在app.use()中, 串接在checkAuth之後的函式 
    }    
});

module.exports = router;
```



### (3) app.js

``` js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//---------------------------------------------
// 使用passport-google-oauth2套件進行認證
//---------------------------------------------
var passport = require('passport');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//載入google oauth2
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//填入自己在google cloud platform建立的憑證
passport.use(
    new GoogleStrategy({
        clientID: '請填入自己的用戶端ID', 
        clientSecret: '請填入自己的用戶端密碼',
        callbackURL: "請填入自己的callbackURL, 如:https://[Heroku上的應用程式名稱].herokuapp.com/auth/google/callback, 作為認證後的呼叫方法"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile) {
            return done(null, profile);
        }else {
            return done(null, false);
        }
    }
));
//---------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//---------------------------------------------
// 設定登入及登出方法內容
//---------------------------------------------
app.get('/user/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }));   //進行google第三方認證

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),   //導向登入失敗頁面	
    function(req, res) {
        // 如果登入成功, 使用者資料已存在session
        console.log(req.session.passport.user.id);
        console.log(req.session.passport.user.displayName);
        console.log(req.session.passport.user.emails[0].value);	    
        
        res.redirect('/');   //導向登入成功頁面
    });

app.get('/user/logout', function(req, res){    
    req.logout();        //將使用者資料從session移除
    
    try{
        req.session.passport.user.id = null;       
    }catch(e){}
    
    res.redirect('/');   //導向登出頁面
});    
//---------------------------------------------
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
```


### (4) 在app.js中, 設定要保護的服務 

``` js
.
.
.

//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var checkAuth = require('./routes/checkAuth');
//------------------------------------------------------------

.
.
.
.
//------------------------------------------------------------------------
// 設定要先登入才能使用的服務:
//
// (1) 假設「產品新增」是登入後才能使用的服務, 
//     假設它的呼叫方式是「/product/add」;
//
// (2) 假設原本使用方式是: 
//     app.use('/product/add', product_add);
//
//     請改成: 
//     app.use('/product/add', checkAuth, product_add);
//------------------------------------------------------------------------
.
.
.
```

 
