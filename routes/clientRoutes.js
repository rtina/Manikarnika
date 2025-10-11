const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const clientController = require('../controllers/clientControllers'); 
const { isLoggedIn } = require("../middleware.js");

router.route("/clientServices")
      .get(isLoggedIn, wrapAsync(clientController.getServices))
      .post(isLoggedIn, wrapAsync(clientController.postServices));
router.get("/clientProfile/:id" , isLoggedIn, wrapAsync(clientController.getProfile));
router.get("/clientChat" , isLoggedIn, wrapAsync(clientController.getChat));
router.get("/logout", wrapAsync(clientController.logout));
router.get('/currentUser', isLoggedIn, clientController.getCurrentUser);
router.post("/updateProfile/:id", isLoggedIn, wrapAsync(clientController.updateProfile));

router.get("/history", wrapAsync(clientController.getHistory));


module.exports = router;