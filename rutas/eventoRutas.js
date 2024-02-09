const express = require('express');
const eventoControlador = require('../controladores/eventoControlador');

const router = express.Router();

router.get('/ingresar-evento',eventoControlador.crearGet);
router.post('/ingresar-evento',eventoControlador.crearPost);
router.put('/editar-evento/:id',eventoControlador.editar);
router.delete('/eliminar-evento/:id',eventoControlador.eliminar);

module.exports = router;
