const express = require('express');
const router = express.Router();
const backuprestoreController = require('../controllers/backuprestoreController');


router.route('/')
    .get(backuprestoreController.getbackup)

module.exports = router;