//------------------------
// 檢查是否已登入
//------------------------
module.exports = {
    isPass:function(req){
        if(!req.session.loginPass){
            return false;
        }else{
            return true;
        }
	}
};


