const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//router.route('/').post()

router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)

module.exports = router