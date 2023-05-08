var express = require('express');
var router = express.Router();
var registerController = require('../controllers/register.controller');

router.get('/',registerController.register);
router.post('/',registerController.register);


module.exports=router;

