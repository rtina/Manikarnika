const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const publicController = require('../controllers/publicController');
const {validateregistration} = require("../middleware.js")
const passport = require("passport");
const { isLoggedIn } = require("../middleware.js");

router.get('/', wrapAsync(publicController.getHome));
router.get('/services', wrapAsync(publicController.getServices));
router.get('/categories', wrapAsync(publicController.getCatelog));
router.route('/login')
      .get(publicController.getLogin)
      .post(passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), publicController.postLogin);
router.route('/register')
      .get(publicController.getRegister)
      .post(validateregistration , wrapAsync(publicController.postRegister));

module.exports = router;
