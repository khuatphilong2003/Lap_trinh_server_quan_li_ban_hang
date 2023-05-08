var cMD = require('../../models/TheLoai.model');
exports.listCategory = async (req,res,next)=>{

    let data = {
        status:1,
        msg:'ok'
    }
    try {
        let listCategory = await cMD.theLoaiModel.find();
        return res.status(200).json({data:listCategory,msg:'Lấy danh sách thành công'})
    } catch (error) {
        return res.status(500).json({msg:'Không có dữ liệu'});
    }
}
exports.postCategory = async (req,res,next) =>{
    let data = {
        status:1,
        msg:'ok',
    }
    // code xu ly them  o day
    try {   
        let obj = new cMD.theLoaiModel();
        obj.name = req.body.name;
        obj.image =req.body.image;
        console.log(obj);
        await obj.save();
    } catch (error) {
        data.msg =error.message;
    }
    //tra ve client
    res.json(data)
}

exports.putCategory = async (req,res,next) =>{
    let data = {
        status:1,
        msg:'ok',
    }
    // code xu ly them  o day
    try {   
        let obj = {
            name:req.body.name,
            image:req.body.image
        }
        await cMD.theLoaiModel.updateOne({_id:req.params.id},obj);
        console.log("Sửa thành công");
    } catch (error) {
        data.msg =error.message;
    }
    //tra ve client
    res.json(data)
}
exports.deleteCategory = async (req,res,next)=>{
    let data = {
        status:1,
        msg:'ok',

    }

    // code xu ly xoa o day
    
    await cMD.theLoaiModel.deleteOne({_id:req.params.id});
    console.log("Xóa thành công");

    //tra ve client
    res.json(data)
}