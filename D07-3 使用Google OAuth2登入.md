# D07-3 使用Google OAuth2登入


### (1) 登入Google cloud platform, https://console.developers.google.com/
![GitHub Logo](/imgs/A-01.jpg)

### (2) 建立OAuth用戶端ID
![GitHub Logo](/imgs/A-02.jpg)

### (3) 得到用戶端ID及用戶端密碼
![GitHub Logo](/imgs/A-03.jpg)


### app.js

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
// 使用session
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

// 載入google oauth2
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        clientID: '請填入自己的GOOGLE_CLIENT_ID', 
        clientSecret: '請填入自己的GOOGLE_CLIENT_SECRET',
        callbackURL: "請填入自己的callbackURL, http://..../auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile) {
            user = profile;
            console.log('處理使用者資訊');
            console.log('***********');        
            console.log(user);
            console.log('***********');
            return done(null, user);
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
app.get('/user/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),   //如果登入失敗, 導向某頁面	
    function(req, res) {
        res.redirect('/');   //如果登入成功, 導向某頁面	
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
