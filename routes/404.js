const path = require('path');
const express = require('express');

const router = express.Router();
const errors = require('../controllers/errors');

router.use('/',errors.Error404); 

module.exports = router;