var db = require('./db');

const sanPhamSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true},
        price:{type:String,required:true},
        image:{type:String,required:true},
        id_category:{type: db.mongoose.Schema.Types.ObjectId,ref:"theLoaiModel"},
        des:{type:String}
    },
    {
        collection:'tbSanPham'
    }
);

let sanPhamModel = db.mongoose.model("sanPhamModel",sanPhamSchema);

module.exports = {
    sanPhamModel
}