# 第13課 網站樣版


## (2) 網站樣版-Express

### 本網站可下載, 檔名「13-2-網站樣版-Express.zip」.


##### 執行結果:(在瀏覽器輸入http://localhost:3000)
![GitHub Logo](/images/results13-2.jpg)


### (3) 執行環境準備:
```
(1) 以「第00課 安裝Node.js及Express」的說明建立一個web網站
(2) 安裝MySQL套件
    npm install mysql --save
(3) 建立一個MySQL資料庫, 名稱為north2, 其內容可由「網站樣版.zip」中<資料庫>內的north2.sql產生.
```


##### 檔案放置方式:
```
** 將「13-2-網站樣版-Express.zip」下載解壓縮後, 複製到網站<web>資料夾中.

 <web>
   |___app.js (修改)
   |
   |___<routes>
   |      |___index.js        (修改) 
   |      |___customerList.js (增加)
   |      |___<lib>
   |            |___db.js     (增加)
   |
   |___<views>
   |      |___index.ejs        (修改)   
   |      |___productList.ejs  (增加)
   |      |___dataNotFound.ejs (增加)   
   |
   |___<public>
          |___<css>
          |___<images>
          |___<js>
```
