const express = require('express'),
router = express.Router(),
bcrypt = require('bcrypt-nodejs'),
userController = require('../controllers/user');

router.get('/',userController.showCabinet);
router.post('/login', userController.loginUser);
router.post('/create', userController.createUser);

module.exports = router;
