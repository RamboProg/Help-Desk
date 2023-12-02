const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.post('/api/v1/auth/login', authController.loginUser); //Login user

router.get('/refresh', authController.refresh);

router.post('/logout' , authController.logout);

module.exports = router;