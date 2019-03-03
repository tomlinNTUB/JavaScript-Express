# B05-1 使用session


### 測試方式

#### 取存受保護頁面
```
http://localhost:3000/protectedPage
```

#### 登入
```
http://localhost:3000/login
```

#### 登出
```
http://localhost:3000/logout
```


### 執行結果
![GitHub Logo](/imgs/B05-1.jpg)


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
(3) 已加載其他外掛, npm install
```

### 追加安裝 express-session
```
npm install express-session --save
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

//處理GET/POST/PUT/DELETE等所有請求
router.all('/', function(req, res, next) {
    var sess = req.session;
    if(sess.userId != null){
        next();  
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

//-----------------------------------------------------------
// 設定模組使用方式
// (使用/protectedPage, 先checkAuth, 通過後再protectedPage
//-----------------------------------------------------------
app.use('/login', login);
app.use('/logout', logout);
app.use('/protectedPage', checkAuth, protectedPage);
//-----------------------------------------------------------

.
.
```
