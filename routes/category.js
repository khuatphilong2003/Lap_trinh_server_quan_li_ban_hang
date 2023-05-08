var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category.controller');
let checkLogin = require('../middleware/checkLogin');
var multer = require('multer');
var upload = multer({dest:'.tmp'})

router.use((req,res,next)=>{
    next();
})

router.get('/',checkLogin.yc_login,categoryController.getList);

//them thể loại
router.post('/',upload.single('img'),categoryController.addCategory);

//xoa the loai
router.get('/delete/:id',categoryController.deleteCategory);
router.post('/delete/:id',categoryController.deleteCategory);

//sua the loai
router.get('/editCategory/:id',categoryController.editCategory);
router.post('/editCategory/:id',upload.single('img'),categoryController.editCategory);




module.exports=router;