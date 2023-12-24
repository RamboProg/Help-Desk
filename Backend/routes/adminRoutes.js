const express = require('express');
const router = express.Router();
const { AssignRole } = require('../controllers/adminController');

router.post('/api/v1/admin/assignRole' , AssignRole);

module.exports = router;