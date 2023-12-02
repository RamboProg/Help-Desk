const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//router.route('/').post()

router.post('/api/v1/auth/login', loginUser); //Login user

router.get('/refresh', refresh)

router.post('/logout' , logout)

module.exports = router