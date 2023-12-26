const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Corrected import

router.post('/api/v1/admin/assignRole', adminController.AssignRole);
router.get('/api/v1/admin/getUsers', adminController.getUsers);
    router.get('/api/v1/admin/getMyNotications', adminController.getMyNotications);
module.exports = router;
