const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const verifyJWT = require('../middleware/verifyJWT');



//router.use(verifyJWT);
// router.post('/login', authController.loginUser); //Login user

router.get('/api/v1/auth/refresh', authController.refresh);

router.post('/api/v1/auth/logout' , authController.logout);

module.exports = router;