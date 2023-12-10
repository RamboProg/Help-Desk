const express = require('express');
const router = express.Router();
const {loginUser} = require('../controllers/authController');
const {refresh} = require('../controllers/authController');
const {logout} = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT');



//router.use(verifyJWT);
router.post('/login',loginUser); //Login user

router.get('/api/v1/auth/refresh', refresh);

router.post('/api/v1/auth/logout' ,logout);

module.exports = router;