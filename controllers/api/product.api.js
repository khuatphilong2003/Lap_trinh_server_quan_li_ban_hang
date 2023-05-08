const pMD = require("../../models/SanPham.model");
exports.listProduct = async (req, res, next) => {
  try {
    let listProduct = await pMD.sanPhamModel.find();
    return res
      .status(200)
      .json({ data: listProduct, msg: "Lấy danh sách thành công" });
  } catch (error) {
    return res.status(500).json({ msg: "Không có dữ liệu" });
  }
};

exports.addProduct = async (req, res, next) => {
  let data = {
    status: 1,
    msg: "ok",
  };
  // code xu ly them  o day
  try {
    const objSP = new pMD.sanPhamModel();
    name = req.body.name;
    price = req.body.price;
    des = req.body.des;
    image = req.body.image;
    id_category = req.body.theloai;
    await objSP.save();
    console.log("Thêm thành công");
  } catch (error) {
    data.msg = error.message;
  }
  //tra ve client
  res.json(data);
};
exports.deleteProduct = async (req,res,nexy) =>{
    let data = {
        status:1,
        msg:'ok',

    }

    // code xu ly xoa o day
    
    await pMD.sanPhamModel.deleteOne({_id:req.params.id});
    
    console.log("Xóa thành công");
    res.json();
}
exports.updateProduct = async (req,res,next)=>{
    let data = {
        status:1,
        msg:'ok',

    }
    // code xu ly them  o day
    try {   
        let obj = {
            "name" : req.body.name,
            "price" : req.body.price,
            "des" : req.body.des,
            "image" : req.body.image,
            "id_category" : req.body.theloai
        }
        await pMD.sanPhamModel.updateOne({_id:req.params.id},obj);
        console.log("Sửa thành công");
    } catch (error) {
        data.msg =error.message;
    }
    //tra ve client
    res.json(data)
}
