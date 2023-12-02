const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.post('/api/v1/auth/login', loginUser); //Login user

router.get('/refresh', refresh)

router.post('/logout' , logout)

module.exports = router