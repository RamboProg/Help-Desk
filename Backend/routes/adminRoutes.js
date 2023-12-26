const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.post('/api/v1/admin/assignRole',authorizationMiddleware([1]), adminController.AssignRole);
router.get('/api/v1/admin/getUsers',authorizationMiddleware([1]), adminController.getUsers);
router.get('/api/v1/admin/getMyNotications',authorizationMiddleware([1]), adminController.getMyNotications);
module.exports = router;
