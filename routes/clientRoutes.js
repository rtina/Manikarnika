const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const clientController = require('../controllers/clientControllers'); 

router.get("/clientServices" , wrapAsync(clientController.getServices));
router.get("/clientProfile/:id" , wrapAsync(clientController.getProfile));
router.get("/clientChat" , wrapAsync(clientController.getChat));
router.get("/logout", wrapAsync(clientController.logout));
router.post("/updateProfile/:id", wrapAsync(clientController.updateProfile));
module.exports = router;