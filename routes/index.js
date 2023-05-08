var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.controllers');
let checkLogin = require('../middleware/checkLogin');


router.use((req,res,next)=>{
    next();
})


/* GET home page. */
router.get('/',checkLogin.yc_login,homeController.index);

module.exports = router;
