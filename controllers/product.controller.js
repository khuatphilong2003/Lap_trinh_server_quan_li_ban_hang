const { log } = require("console");
var spModel = require("../models/SanPham.model");
var tlModel = require("../models/TheLoai.model");
var fs = require("fs");
exports.product = async (req, res, next) => {
  var msg = "";
  let list = await spModel.sanPhamModel.find();

  var theloai = req.query.theloai;
  var cot = req.query.cot;

  let demTrang = Math.ceil(list.length/5);
  let dieukien = null;
  let listCategory = await tlModel.theLoaiModel.find();
  
  let name = req.query.name;
  let  sortOrder = req.query.order === 'desc' ? -1 : 1;
  let sort = req.query.sort;
  
  if(name){
    dieukien = {name:name};
    let listProduct = await spModel.sanPhamModel
    .find(dieukien).limit(5)
    .populate("id_category");
    return res.render("Products/product", {
      listProduct: listProduct,
      listCategory: listCategory,
      theloai: theloai,
      cot: cot,
      list:list,
      sortOrder:sortOrder,
      demTrang:demTrang,
      msg: msg,
    });
  }
 
    if (typeof(req.query.theloai) != "undefined") {
      let id_category = req.query.theloai;
      dieukien = { id_category: id_category };
    }
    if (req.query.theloai == "All") {
      dieukien = null;
    }
    
    if(typeof(req.query.limit) !=  "undefined"){
     
  
      let listProduct = await spModel.sanPhamModel
      .find(dieukien).limit(req.query.limit)
      .populate("id_category")
      return  res.render("Products/product", {
        listProduct: listProduct,
        listCategory: listCategory,
        theloai: theloai,
        cot: cot,
        sortOrder:sortOrder,
        msg: msg,
      });
    }
    if(typeof(req.query.page) != 'undefined'){
      let page = req.query.page;
      let skip = (5* page) -5;
      let listProduct = await spModel.sanPhamModel
      .find(dieukien).skip(skip).limit(5)
      .populate("id_category")
      return  res.render("Products/product",{
        listProduct: listProduct,
        listCategory: listCategory,
        theloai: theloai,
        cot: cot,
        list:list,
        sortOrder:sortOrder,
        demTrang:demTrang,
        msg: msg,
      });
    }
  
    
    let listProduct = await spModel.sanPhamModel
      .find(dieukien).limit(5)
      .populate("id_category");
    if (listProduct.length == 0) {
      msg = "Không có bản ghi nào";
    }
    
    if(typeof(sortOrder) != 'undefined'){
      let listProduct = await spModel.sanPhamModel
      .find(dieukien).limit(5).sort({[sort]:sortOrder})
      .populate("id_category");
      return res.render("Products/product", {
        listProduct: listProduct,
        listCategory: listCategory,
        theloai: theloai,
        cot: cot,
        list:list,
        demTrang:demTrang,
        sortOrder:sortOrder,
        msg: msg,
      });
    }
    res.render("Products/product", {
      listProduct: listProduct,
      listCategory: listCategory,
      theloai: theloai,
      cot: cot,
      list:list,
      demTrang:demTrang,
      sortOrder:sortOrder,
      msg: msg,
    });
  
 



  
};
exports.addProduct = async (req, res, next) => {
  var url_image = "";
  var base64Image = "";
  var listCategory = await tlModel.theLoaiModel.find();
  var msg = "";
  if (req.method == "POST") {
    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          url_image = "/uploads/" + req.file.originalname;
          var fileImage = fs.readFileSync("public" + url_image, {
            encoding: "base64",
          });
          base64Image = "data:image/png;base64," + fileImage.toString("base64");
          const objSP = new spModel.sanPhamModel();
          objSP.name = req.body.name;
          objSP.price = req.body.price;
          objSP.des = req.body.des;
          objSP.image = base64Image;
          objSP.id_category = req.body.theloai;
          console.log(req.body.theloai);
          try {
            await objSP.save();
            console.log("Thêm thành công");
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
    msg="Thêm thành công"
  }

  res.render('Products/addProduct',{msg:msg,listCategory:listCategory});
};
exports.deleteProduct = async (req, res, next) => {
  await spModel.sanPhamModel.deleteOne({ _id: req.params.id });
  console.log("Xóa thành công");
  res.redirect("/product");
};
exports.editProduct = async (req, res, next) => {
  let thongBao ="";
  let listCategory = await tlModel.theLoaiModel.find();
  let objSPE = await spModel.sanPhamModel.findById({ _id: req.params.id });
  if (req.method == "POST") {
    if (req.body.name.length == 0) {
      thongBao = "Tên sản phẩm không được bỏ trống";
      return res.render("Products/editProduct",{
        thongBao: thongBao,
        listCategory: listCategory,
        objSPE: objSPE,
      });
    }
    if (req.body.price.length == 0) {
      thongBao = "Giá sản phẩm không được bỏ trống";
      return res.render("Products/editProduct", {
        thongBao: thongBao,
        listCategory: listCategory,
        objSPE: objSPE,
      });
    }

    if (!req.file) {
      let objSPN = {
        name: req.body.name,
        price: req.body.price,
        des: req.body.des,
        id_category: req.body.theloai,
        img:objSPE.image
      };
      try {
        await spModel.sanPhamModel.updateOne({ _id: req.params.id }, objSPN);
        thongBao = "Sửa thành công";
        return res.render("Products/editProduct", {
          thongBao: thongBao,
          listCategory: listCategory,
          objSPE: objSPE,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          url_image = "/uploads/" + req.file.originalname;
          var fileImage = fs.readFileSync("public" + url_image, {
            encoding: "base64",
          });
          base64Image = "data:image/png;base64," + fileImage.toString("base64");
          let objSPN = {
            name: req.body.name,
            price: req.body.price,
            des: req.body.des,
            id_category: req.body.theloai,
            image: base64Image
          };
          try {
            await spModel.sanPhamModel.updateOne(
              { _id: req.params.id },
              objSPN
            );
            thongBao = "Sửa thành công";
            
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  }

  res.render("Products/editProduct", {
    thongBao: thongBao,
    listCategory: listCategory,
    objSPE: objSPE,
  });
};

exports.infoProduct = async (req, res, next) => {
  let objSPE = await spModel.sanPhamModel
    .findById({ _id: req.params.id })
    .populate("id_category");
  res.render("Products/infoProduct", { objSPE: objSPE });
};

exports.deletePd = async (req, res, next) => {
  await spModel.sanPhamModel.deleteOne({ _id: req.params.id });
  res.redirect("/product");
};
