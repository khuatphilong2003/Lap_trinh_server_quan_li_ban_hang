exports.yc_login =  (req,res,next)=>{
    if(req.session.userLogin){
        next();
    }else{
        return res.redirect("/login");
    }
}
exports.khong_yc_login = (req,res,next)=>{
    if(!req.session.userLogin){
        next();
    }
    else{
        return res.redirect("/");
    }
}
