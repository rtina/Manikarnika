const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getHome);
router.get('/services', publicController.getServices);
router.get('/categories', publicController.getCategories);
router.get('/login', publicController.getLogin);
router.get('/register', publicController.getRegister);

module.exports = router;
