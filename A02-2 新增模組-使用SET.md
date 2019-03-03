# A02-2 新增模組-使用SET

### 測試方式
```
node main.js
```


### 執行結果
![GitHub Logo](/imgs/results02-1.jpg)


### 檔案放置方式
```
|__ main.js
|   
|__ <utility>
        |__ asyncDB.js    
        |__ addProduct.js
```

### 假設
```
(1) 已安裝Node.js
(2) 已加載MySQL外掛, npm install mysql --save
(3) 已安裝MySQL
(4) 已在MySQL中安裝north資料庫    
```


### (1) asyncDB.js

``` js
'use strict';

//引用mysql模組
var mysql = require('mysql');

//建立資料庫連接池
var pool  = mysql.createPool({
    user: 'root',
    password: 'mysql',
    host: '127.0.0.1',
    database: 'north'     
});

//產生可同步執行query物件的函式
function query(sql, value) {
    return new Promise((resolve, reject) => {
        pool.query(sql, value, function (error, results, fields) {
            if (error){
                reject(error);
            }else{
                resolve(results);
            }
        });
    });
}

//匯出
module.exports = query;
```



### (2) addProduct.js  
``` js
'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//執行資料庫動作的函式-傳回所有產品資料
var addProduct = async function(newData){
    var result;

    await query('INSERT INTO product SET ?', newData)
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = addProduct;
```


### (3) main.js
``` js
'use strict';

//引用函式
const addProduct = require('./utility/addProduct');

//產生一個物件
var newData = {
    proNo: 'P200',
    proName: '凍豆腐',
    price: 50
}

//執行函式
addProduct(newData).then(d => {
    if(d==0){
        console.log('P200-新增成功');        
    }else{
        console.log('P200-新增失敗');
    }
})
```
