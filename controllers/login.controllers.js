const uModel = require('../models/User.model');

exports.login= async (req,res,next)=>{
    let msg = "";
    if(req.method == "POST"){
        try {
            let objU = await uModel.userModel.findOne({username:req.body.username});
            console.log(objU);
        if(objU != null){
            if(objU.password != req.body.password){
                msg="Mật khẩu không đúng"
            }
            else{
                //lưu thông tin người dùng
                req.session.userLogin = objU;
                return res.redirect('/');
            }
        }
        else{
            msg="Tài khoản không tồn tại"
        }
        } catch (error) {
            console.log(error);
        }
        
    }
    res.render('Login/login',{msg:msg});
}