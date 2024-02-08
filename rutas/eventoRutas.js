const express = require('express');
const eventoControlador = require('../controladores/eventoControlador');

const router = express.Router();

router.get('/ingresar-evento',eventoControlador.crearGet);
router.post('/ingresar-evento',eventoControlador.crearPost);

module.exports = router;
