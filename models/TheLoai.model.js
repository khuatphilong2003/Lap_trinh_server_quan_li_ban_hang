var db = require('./db');

const theLoaiSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true},
        image:{type:String,required:true}
    },
    {
        collection:"tbTheLoai"
    }
);

let theLoaiModel = db.mongoose.model('theLoaiModel',theLoaiSchema);

module.exports = {
    theLoaiModel
}