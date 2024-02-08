const express = require('express');
const seccionControlador = require('../controladores/seccionControlador');

const router = express.Router();

router.get('/ingresar-seccion',seccionControlador.crearGet);
router.post('/ingresar-seccion',seccionControlador.crearPost);

module.exports = router;
