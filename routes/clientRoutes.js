const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientControllers'); 

router.get("/clientDashboard" , clientController.getDashboard);
router.get("/clientProfile" , clientController.getProfile);
router.get("/clientChat" , clientController.getChat);

module.exports = router;