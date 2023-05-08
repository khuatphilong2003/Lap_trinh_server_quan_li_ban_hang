var express = require('express');
var router = express.Router();
var proController = require('../controllers/api/product.api');
var cateController = require('../controllers/api/category.api');
//lay danh sach san pham

router.get('/products',proController.listProduct);
router.post('/addProduct',proController.addProduct);
router.delete ('/deleteProduct/:id',proController.deleteProduct);
router.put('/updateProduct/:id',proController.updateProduct);









//the loai
router.get('/category',cateController.listCategory);
router.post('/addCategory',cateController.postCategory);
router.put('/putCategory/:id',cateController.putCategory);
router.delete('/deleteCategory/:id',cateController.deleteCategory);

module.exports = router;