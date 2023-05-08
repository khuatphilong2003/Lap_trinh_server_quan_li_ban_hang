var express = require('express');
var router = express.Router();
var projectController = require('../controllers/project.cotroller');
let checkLogin = require('../middleware/checkLogin');

router.use((req,res,next)=>{
    next();
})
router.get('/',checkLogin.yc_login,projectController.project);

module.exports=router;