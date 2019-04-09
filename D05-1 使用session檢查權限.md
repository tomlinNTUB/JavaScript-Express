# D05-1 使用session檢查權限


### 測試方式

#### 取存受保護頁面
```
https://自己的app名稱.herokuapp.com/product/protectedPage
```

#### 登入
```
https://自己的app名稱.herokuapp.com/product/login
```

#### 登出
```
https://自己的app名稱.herokuapp.com/product/logout
```


### 執行結果
![GitHub Logo](/imgs/C05-1.jpg)


### 網頁樣板
```
<下載>資料夾中的[網頁樣板.zip]
```

### 檔案放置方式
```
 <web>
   |
   |__ <views>
   |      |__ login.ejs  
   |      |__ logout.ejs   
   |      |__ protectedPage.ejs 
   |      |__ unauthorized.ejs    
   |      
   |__ <routes>
   |      |__ login.js
   |      |__ login.js
   |      |__ protectedPage.js   
   |      |__ checkAuth.js     
   |
   |__ app.js    
```

### 假設
```
(1) 已安裝Node.js
(2) 已安裝Express, npm install express-generator -g
(3) 已使用Express建立網站(假設網站名稱為web), express web -ejs  
(4) 已加載PostGreSQL外掛, npm install pg --save
(5) 已在Heroku建立north-pg資料庫   
```

### 追加express-session外掛
```
npm install express-session --save
```


## 上傳至Heroku
``` 
(1) (網頁)已下載及安裝Node.js
(2) 已安裝Heroku CLI, npm install heroku -g
(3) (網頁)已下載及安裝git CLI
(4) (網頁)已登入Github
(5) (網頁)已登入Line Developer
(6) (網頁)已登入Heroku
(7) heroku login -i
(8) git config --global user.email "自己在git的email帳號"
(9) git init
(10) heroku git:remote -a [Heroku上的應用程式名稱]
---------------------------------------------------
(11) git add .
(12) git commit -am "web"
(13) git push heroku master -f
```

### (1) login.ejs

``` html
<!DOCTYPE html>
<html>
    <head>
        <title>已成功登入</title>
    </head>
    <body>
        <h1>已成功登入</h1>
    </body>
</html>
```

### (2) logout.ejs
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>已成功登出</title>
    </head>
    <body>
        <h1>已成功登出</h1>
    </body>
</html>
```

### (3) protectedPage.ejs
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>受保護頁面</title>
    </head>
    <body>
        <h1>這是受保護頁面, 您有權限閱讀</h1>
    </body>
</html>
```

### (4) unauthorized.ejs
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>無取存權限</title>
    </head>
    <body>
        <h1>無取存權限</h1>
    </body>
</html>
```

### (5) login.js  
``` js
var express = require('express');
var router = express.Router();

//處理GET請求(如接受POST請求再增加宣告)
router.get('/', function(req, res, next) {
    //增加一個session註記
    var sess = req.session;
    sess.userId = '1001';    
    
    res.render('login');
});

module.exports = router;
```


### (6) logout.js  
``` js
var express = require('express');
var router = express.Router();

//處理GET請求(如接受POST請求再增加宣告)
router.get('/', function(req, res, next) {
    //取消session註記
    var sess = req.session;
    sess.userId = null;    
    
    res.render('logout');
});

module.exports = router;
```


### (7) protectedPage.js  
``` js
var express = require('express');
var router = express.Router();

//處理GET請求(如接受POST請求再增加宣告)
router.get('/', function(req, res, next) {
    res.render('protectedPage');
});

module.exports = router;
```

### (8) checkAuth.js  
``` js
var express = require('express');
var router = express.Router();

//處理GET, POST, PUT, DELETE等所有請求
router.all('/', function(req, res, next) {
    //檢查是否有session註記
    var sess = req.session;
    
    if(sess.userId != null){
        next();  //執行在app.use()設定串接於其後的函式 
    }else{
        res.render('unauthorized');
    }    
});

module.exports = router;
```

### (9) app.js  
``` js
.
.
.
//--------------------------------------------------------------------
// 增加引用模組
//--------------------------------------------------------------------
var login = require('./routes/login');
var logout = require('./routes/logout');
var protectedPage = require('./routes/protectedPage');
var checkAuth = require('./routes/checkAuth');
//--------------------------------------------------------------------

.
.
.

//--------------------------------------------------------------------
// 增加引用express-session
//--------------------------------------------------------------------
var session = require('express-session');
app.use(session({secret: '請更改成一個隨機字串用來加密產生的signedCookie', cookie: { maxAge: 60000 }}));
//--------------------------------------------------------------------

.
.
.

//------------------------------------------------------------------------
// 設定模組使用方式
// **若使用/protectedPage, 先執行checkAuth, 通過後再執行protectedPage
//------------------------------------------------------------------------
app.use('/login', login);
app.use('/logout', logout);
app.use('/protectedPage', checkAuth, protectedPage);
//------------------------------------------------------------------------

.
.
```
