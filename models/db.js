var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ass_qlbh').catch((err)=>{console.log(err)});

module.exports = {
    mongoose
}