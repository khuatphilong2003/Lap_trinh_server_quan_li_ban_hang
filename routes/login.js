var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.controllers');

router.get('/',loginController.login);
router.post('/',loginController.login);
module.exports=router;
