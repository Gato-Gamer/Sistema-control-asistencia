const express = require('express');
const tikeoController = require('../controllers/tikeoMdb');

const router = express.Router();

router.get('/', tikeoController.getAllTikeos);

module.exports = router;
