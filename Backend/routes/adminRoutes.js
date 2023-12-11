const express = require('express');
const router = express.Router();
const { createNewUser } = require('../controllers/adminController');

router.post('/api/v1/users' , createNewUser);

module.exports = router;