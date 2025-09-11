const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers'); 

router.get("/dashboard" , adminController.getDashboard);
router.get("/users" , adminController.getUsers);
router.get("/transactions", adminController.getTransactions);
router.get("/team", adminController.getTeam);
router.get("/projects", adminController.getProjects);

module.exports = router;

