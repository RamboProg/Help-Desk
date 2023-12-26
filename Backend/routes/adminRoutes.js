const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Corrected import

router.post('/api/v1/admin/assignRole', adminController.AssignRole);
router.get('/api/v1/admin/getUsers', adminController.getUsers);
module.exports = router;