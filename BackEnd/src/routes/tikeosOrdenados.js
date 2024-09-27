const tikeoOrdenado = require('../controllers/mongoOrganizarPorFecha'); 
const express = require('express');

const router = express.Router();

router.get('/', tikeoOrdenado.getCheckTimesByDate);

module.exports = router;
