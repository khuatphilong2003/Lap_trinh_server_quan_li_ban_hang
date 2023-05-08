const tlModel = require("../models/TheLoai.model");
const fs = require("fs");
exports.getList = async (req, res, next) => {
  let listCategory = await tlModel.theLoaiModel.find();
  let cot = req.query.cot;
  let name = req.query.name;
  console.log(req.query.giam);
  console.log(cot);
  if (typeof req.query.giam != "undefined") {
    listCategory = await tlModel.theLoaiModel.find().sort({ [cot]: -1 });
  }
  if (typeof req.query.tang != "undefined") {
    listCategory = await tlModel.theLoaiModel.find().sort({ [cot]: 1 });
  }
  if(name){
    listCategory = await tlModel.theLoaiModel.find({name:name}).sort({ [cot]: 1 });
    return res.render("Category/category", { listCategory: listCategory, cot: cot });
  }

  res.render("Category/category", { listCategory: listCategory, cot: cot });
};
exports.addCategory = async (req, res, next) => {
  var url_image = "";
  var base64Image = "";
  let msg = ""
  if (req.method == "POST") {
      if(req.body.name.length == 0){
        msg = "Tên không được bỏ trống"
        return res.render("Category/category",{msg:msg})
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
          let objCategory = new tlModel.theLoaiModel();
          objCategory.name = req.body.name;
          objCategory.image = base64Image;
          try {
            await objCategory.save();
            console.log("Thêm thành công");
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  }
  res.redirect("/category");
};
exports.deleteCategory = async (req, res, next) => {
  await tlModel.theLoaiModel.deleteOne({ _id: req.params.id });
  console.log("Xóa thành công");
  res.redirect("/category");
};
exports.editCategory = async (req, res, next) => {
  let objCategoryE = await tlModel.theLoaiModel.findById({
    _id: req.params.id,
  });
  let thongBao = "";
  var url_image = "";
  var base64Image = "";
  if (req.method == "POST") {
    if (req.body.name.length == 0) {
      thongBao = "Tên không được bỏ trống";
      return res.render("Category/editCategory", {
        objCategoryE: objCategoryE,
        thongBao: thongBao,
      });
    }

    if (!req.file) {
      let objCategoryN;

      objCategoryN = {
        name: req.body.name,
        image: objCategoryE.image,
      };

      try {
        await tlModel.theLoaiModel.updateOne(
          { _id: req.params.id },
          objCategoryN
        );
      } catch (error) {
        console.log(error);
      }
      return res.render("Category/editCategory", {
        objCategoryE: objCategoryE,
        thongBao: thongBao,
      });
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
          let objCategoryN;

          objCategoryN = {
            name: req.body.name,
            image: base64Image,
          };

          try {
            await tlModel.theLoaiModel.updateOne(
              { _id: req.params.id },
              objCategoryN
            );

          } catch (error) {
            console.log(error);
          }
        }
        thongBao = "Sửa thành công"
      }
    );

    
  }
  res.render("Category/editCategory", {
    objCategoryE: objCategoryE,
    thongBao: thongBao,
  });
};
