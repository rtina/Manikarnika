const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers'); 

router.get("/dashboard" , adminController.getDashboard);
router.get("/users" , adminController.getUsers);
router.get("/transactions", adminController.getTransactions);

module.exports = router;

