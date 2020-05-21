## 上傳網站至Heroku

#### 1. 前置作業
``` html
(1) (網頁)已下載及安裝Node.js
(2) 已安裝Heroku CLI, npm install heroku -g
(3) (網頁https://git-scm.com/downloads)已下載及安裝git CLI
(4) (網頁)已登入Github
(5) (網頁)已登入Heroku
```

#### 2. 前置作業 (假設程式在D:\web中)
``` html
(6) 在<bin>中的www檔內, 增加(第17行):
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
(7) d:
    cd web 
(8) heroku login -i
(9) git config --global user.email "自己在git的email帳號"  (雙引號要輸入)
(10) git init
(11) heroku git:remote -a [Heroku上的應用程式名稱]  (中括號不輸入)
```

#### 3. 上傳作業
``` html
(12) git add .
(13) git commit -am "myApp"
(14) git push heroku master -f
```

#### 4. 查看程式
``` html
https://[Heroku上的應用程式名稱].herokuapp.com
``` 

#### 5. 查看heroku終端機畫面
``` html
(15) heroku logs --tail
```
