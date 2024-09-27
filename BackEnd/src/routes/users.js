const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAllPersonal);

module.exports = router;
