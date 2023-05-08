var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');
var checkLogin = require('../middleware/checkLogin');
var multer = require('multer');
var uploader = multer({dest:'.tmp'});

router.use((req,res,next)=>{
    next();
})

router.get('/',checkLogin.yc_login,productController.product);

//them san pham
router.get('/addProduct',productController.addProduct);
router.post('/addProduct',uploader.single('img'),productController.addProduct);

//xoa san pham
router.get('/delete/:id',productController.deleteProduct);
router.post('/delete/:id',productController.deleteProduct);


//sua san pham
router.get('/editProduct/:id',productController.editProduct);
router.post('/editProduct/:id',uploader.single('img'),productController.editProduct);

//chi tiet san pham
router.get('/infoProduct/:id',productController.infoProduct);

module.exports=router;