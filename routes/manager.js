var express = require('express');
var router = express.Router();
var managerController = require('../controllers/manager.controller');
let checkLogin = require('../middleware/checkLogin');

router.use((req,res,next)=>{
    next();
})

router.get('/',checkLogin.yc_login,managerController.manager);

module.exports=router;