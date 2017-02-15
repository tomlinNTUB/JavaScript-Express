# 第00課 安裝Express及建立網站


## (1)下載及安裝 Node.js

這裡的測試使用 Windows 7 作業系統,<br>
Node.js 可以在 `https://nodejs.org/en/` 下載. <p>
版本編號與圖示可能不同,<br>
雙擊下載檔案以執行安裝程式. <p>
圖示如下:<p>
![GitHub Logo](/images/f00_1.png)


## (2)安裝 Express

在命令提示字元的環境下, 輸入:<br>
```
npm install express-generator -g
```

圖示如下:<p>
![GitHub Logo](/images/f00_2.png)


## (3)建立一個 Express 框架的網站

假設網站將建立磁碟機D槽內的<web>資料夾中, 如下:

```
d:\
 |__<web>  
      |__ (網站內容)
```

在命令提示字元的環境下輸入:<br>
```
d:
cd\
express web -ejs
```
圖示如下:<p>
![GitHub Logo](/images/f00_3.png)



## (4)安裝 web 網站需要的套件

在命令提示字元的環境下輸入:<br>
```
cd web
npm install
```
圖示如下:<p>
![GitHub Logo](/images/f00_4.png)



## (5)安裝其他需要的套件(*依需要)

在命令提示字元的環境下輸入(假設要加入mysql套件):<br>
```
npm install mysql --save
```
圖示如下:<p>
![GitHub Logo](/images/f00_5.png)



## (6)啟動web網站

在命令提示字元的環境下輸入:<br>
```
npm start
```
圖示如下:<p>
![GitHub Logo](/images/f00_6.png)



## (7)測試連結web網站

在瀏覽器網址入:<br>
```
http://localhost:3000
```
圖示如下:<p>
![GitHub Logo](/images/f00_7.png)



## (8)停止web網站

在命令提示字元的環境下同時按下:<br>
```
[Ctrl]鍵 及 [c]鍵
```
圖示如下:<p>
![GitHub Logo](/images/f00_8.png)



## (9)重新啟動web網站

如步驟(6), 在命令提示字元的環境下輸入:<br>
```
npm start
```
圖示如下:<p>
![GitHub Logo](/images/f00_9.png)

