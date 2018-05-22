var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./db.js');

//-----------------
// 引用multer外掛
//----------------- 
var multer  = require('multer');

//---------------------------------
// 上傳圖片存放資料夾及檔名設定
//---------------------------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public\\images');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

//-----------------------------------------------
// 產生multer的上傳物件
//-----------------------------------------------
var maxSize=1024*1024;  //設定最大可接受圖片大小
var upload = multer({
    storage:storage
})


//========================
// 處理POST請求
//========================
router.post('/', upload.single('picture'), function(req, res) {
    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        //----------------------------------
        // 上傳檔案大小不可超過 maxSize 
        //----------------------------------
        if(req.file.size>maxSize){
            res.render('productFileSizeFail', {});  //圖片過大的錯誤
            return;
        }                      
    }      

    // 取得使用者傳來的參數
    var proNo=req.param("proNo");
    var proName=req.param("proName");
    var supNo=req.param("supNo");
    var typNo=req.param("typNo");
    var price=req.param("price");
    var stockAmt=req.param("stockAmt");
    var inventoryDate=req.param("inventoryDate");
    var picture='';
	
    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        picture=req.file.filename;   //取得上傳圖片新名稱             
    }
    
    // 建立一個新資料物件
    var newData={
        proNo:proNo,
        proName:proName,
        supNo:supNo,
        typNo:typNo,
        price:price,
        stockAmt:stockAmt,
        inventoryDate:inventoryDate,
        picture:picture
    }   

    pool.query('INSERT INTO product SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('addFail', {});     //新增失敗
        }else{
            res.render('addSuccess', {});  //新增成功
        }
    });
});

module.exports = router;



