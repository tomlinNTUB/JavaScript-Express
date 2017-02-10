#第01課 使用require指令

##(1) 將資料庫連結物件寫在模組中

#####檔案放置方式:
```
   |___test.js
   |___db.js    
```


#####檔案名稱: test.js
```js
//----------------------------------------------------
// 透過require引用db.js的connection物件,
// 即使多個程式均引用, 在系統中只有一份connection物件.
//----------------------------------------------------
var connection = require('./db.js');

connection.query('SELECT * from student', function (error, results, fields) {
    if (error) throw error;
    for(var i=0; i<results.length; i++){
        console.log(results[i].stuName);
    }
});
```


#####檔案名稱: db.js
```js
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'mysql',
    database : 'student'
});

connection.connect(function(err) {
    if (err) throw err;
});

//---------------------------------
// 引用此模組時將匯出connection物件
//---------------------------------
module.exports = connection;
```



##(2) 將資料庫連結池寫在模組中

#####檔案放置方式:
```
   |___test.js
   |___db.js    
```


#####檔案名稱: test.js
```js
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./db.js');

pool.query('select * from student', function (error, results, fields) {
    if (error) throw error;
    for(var i=0; i<results.length; i++){
	      console.log(results[i].stuName);
    }		
});
```


#####檔案名稱: db.js
```js
var mysql = require('mysql');

//------------------------
// 建立資料庫連線池
//------------------------
var pool  = mysql.createPool({
    user: 'root',
    password: 'mysql',
    host: '127.0.0.1',
    database: 'student', 
    waitForConnections : true, // 無可用連線時是否等待pool連線釋放(預設為true) 
    connectionLimit : 10       // 連線池可建立的總連線數上限(預設最多為10個連線數)
});

//----------------------------
// 引用此模組時將匯出pool物件
//----------------------------
module.exports = pool;
```
