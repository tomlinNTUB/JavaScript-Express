## 上傳網站至Heroku

#### 1. 前置作業
``` html
(1) (網頁)下載及安裝 Node.js
(2) 安裝Heroku CLI, 
    npm install heroku -g
(3) (網頁https://git-scm.com/downloads)已下載及安裝git CLI
(4) (網頁)已登入Github
(5) (網頁)已登入Heroku
```

#### 2. 前置作業 (假設程式在D:\web中)
``` html
(1) 在<bin>中的 www 檔內, 增加(第17行):
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
(2) d:
    cd web 
(3) heroku login -i
(4) (以下雙引號要輸入)
    git config --global user.email "自己在git的email帳號"
(5) git init
(6) (以下中括號不輸入)
    heroku git:remote -a [Heroku上的應用程式名稱]  
```

#### 3. 上傳作業
``` html
(1) git add .
(2) git commit -am "myApp"
(3) git push heroku master -f
```

#### 4. 查看程式
``` html
https://[Heroku上的應用程式名稱].herokuapp.com
``` 

#### 5. 查看heroku終端機畫面
``` html
heroku logs --tail
```
