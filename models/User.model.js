var db = require('./db');

const userSchema = new db.mongoose.Schema(
    {
        "fullname":{type:String,required:true},
        "username":{type:String,required:true},
        "email":{type:String,required:true},
        "password":{type:String,required:true},
        "role":{type:String,required:true}
    },
    {
        collection:"tbUser"
    }
);
let userModel = db.mongoose.model('userModel',userSchema);

module.exports = {
    userModel
}