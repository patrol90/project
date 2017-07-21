const express = require('express'),
router = express.Router(),
mainPageController = require('../controllers/index');


/* GET home page. */
router.get('/', mainPageController.indexShow);
router.get('/register',mainPageController.userCreate);
router.get('/login', mainPageController.userLogin);

module.exports = router;
