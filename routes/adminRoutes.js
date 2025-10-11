const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const adminController = require('../controllers/adminControllers'); 
const { isLoggedIn, isAdmin } = require('../middleware');

router.get("/dashboard" , isLoggedIn , isAdmin , wrapAsync(adminController.getDashboard));
router.get("/users" , wrapAsync(adminController.getUsers));
router.get("/transactions", wrapAsync(adminController.getTransactions));
router.get("/team", wrapAsync(adminController.getTeam));
router.get("/chats", wrapAsync(adminController.getChats));
router.get("/logout", wrapAsync(adminController.logout));

module.exports = router;

