const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const logsController = require('../controllers/logsController');

router.get('/logs', authorizationMiddleware([1]), logsController.getLogs);

module.exports = router;