const rgModel = require('../models/User.model');
const uModel = require('../models/User.model');
exports.register = async (req,res,next)=>{
    let msg = "";
    if(req.method == "POST"){
        let list = await uModel.userModel.find();
        if(req.body.fullname.length ==0){
            msg = "Fullname không được bỏ trống"
            return res.render('Register/register',{msg:msg});
        }
        if(req.body.email.length ==0){
            msg = "Email không được bỏ trống"
            return res.render('Register/register',{msg:msg});
        }
       
        
        if(req.body.username.length ==0){
            msg = "Username không được bỏ trống"
            return res.render('Register/register',{msg:msg});
        }
        else{
            var check = /^[a-z0-9]{3,16}$/;
            if(!check.test(req.body.username)){
                msg="Tên đăng nhập phải có ký tự chữ và số,chữ cái đầu không viết hoa, ít nhất 3 ký tự không vượt quá 16 ký tự"
                return res.render('Register/register',{msg:msg});
            }
        }
        if(req.body.passwd.length ==0){
            msg = "Password không được bỏ trống"
            return res.render('Register/register',{msg:msg});
        }
    //     else{
    //         let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //         if(!check.test(req.body.passwd)){
    //             msg="Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
    //             return res.render('Register/register',{msg:msg});
    //     }
    // }
        

        if(req.body.username !=0){
            for(let i=0;i<list.length;i++){
                if(req.body.username == list[i].username){
                    msg = "Tài khoản đã tồn tại"
                    return res.render('Register/register',{msg:msg});
                }
            }
        }
        
        const objRg = new rgModel.userModel();
        objRg.fullname = req.body.fullname;
        objRg.username = req.body.username;
        objRg.email = req.body.email;
        objRg.password = req.body.passwd;
        objRg.role = "admin"
        try {
             await objRg.save();
            msg = "Đăng ký thành công"
        } catch (error) {
            console.log(error);
        }
    }
    
    res.render('Register/register',{msg:msg});
}