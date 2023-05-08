let uModel = require("../models/User.model");
exports.manager = async (req, res, next) => {
  let msg = "";
  let listUser = await uModel.userModel.find();
  let cot = req.query.cot;
  let search = req.query.name;

  if (req.query.giam == -1) {
    listUser = await uModel.userModel.find().sort({ [cot]: -1 });
  }
  if (req.query.tang == 1) {
    listUser = await uModel.userModel.find().sort({ [cot]: 1 });
  }

  if (search) {
    listUser = await uModel.userModel.find({ username: search });
    if (listUser.length == 0) {
      msg = "Không có bản ghi nào";
    }
  }
  res.render("Manager/manager", { listUser: listUser, msg: msg, cot: cot });
};
