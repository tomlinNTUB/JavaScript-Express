## 第12課 回傳JSON格式資料



### (1-1) Express網站修改部份檔案:
```
 <web>
   |___app.js (修改)
   |
   |___<routes>
          |___fetchData.js (增加)
          |___<lib>
                |___db.js (增加)   
```


### (1-2) 加載外掛:
```
以命令提示字元畫面, 在 <web> 資料夾中執行以下命令:

npm install mysql --save
npm install cors --save   
```



### (2-1) 檔案名稱: app.js
```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//-------------------------------------------------------
// 增加以下的require
//-------------------------------------------------------
var fetchData = require('./routes/fetchData');
//-------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//------------------------------
app.set('json spaces', 4);
var cors = require('cors');
app.use(cors());
//------------------------------

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//-------------------------------------------------------
// 增加以下的app.use()
//-------------------------------------------------------
app.use('/fetchData', fetchData);
//-------------------------------------------------------

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


### (2-2) 檔案名稱: db.js
```js
var mysql = require('mysql');

//------------------------
// 建立資料庫連線池
//------------------------
var pool  = mysql.createPool({
    user: '填入資料庫帳號',
    password: '填入資料庫密碼',
    host: '127.0.0.1',
    database: '填入資料庫名稱', 
    waitForConnections : true, 
    connectionLimit : 10       
});

//----------------------------
// 引用此模組時將匯出pool物件
//----------------------------
module.exports = pool;
```



### (2-3) 檔案名稱: fetchData.js
```js
var express = require('express');
var router = express.Router();

//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');


//----------------
// GET請求
//----------------
router.get('/', function(req, res, next) {	
    var now=new Date();
    console.log('----------------------------');
    console.log('fetchData.js(get):' + now);
    sendData(res);
});


//----------------
// POST請求
//----------------
router.post('/', function(req, res, next) {	
    var now=new Date();
    console.log('----------------------------');
    console.log('fetchData.js(post):' + now); 
    sendData(res);
});


//--------------------
// 回傳JSON資料
//--------------------
function sendData(res){
    pool.query('select * from customer', function (error, results, fields) {
        //回傳資料(初值為空陣列)
        var data=[];
		
        if (error){			
            res.send(JSON.stringify(data));
        }else{			
            //逐筆取出資料, 加入data陣列中
            for(var i=0; i<results.length; i++){
                //取出若干欄位資料
                var cusNo=results[i].cusNo;
                var cusName=results[i].cusName;				

                //將資料加入物件中
                var item={};
                item.cusNo=cusNo;
                item.cusName=cusName;
				
                //將存有資料的物件加入陣列
                data.push(item);
            }	
			
            //將陣列轉為JSON格式字串, 回傳給呼叫者
            res.json(data);
        }       
    });
}

module.exports = router;
```
