const express = require('express');
const materiaControlador = require('../controladores/materiaControlador');

const router = express.Router();

router.get('/ingresar-materia',materiaControlador.crearGet);
router.post('/ingresar-materia',materiaControlador.crearPost);
router.put('/editar-materia/:id',materiaControlador.editar);
router.put('/editar-materia-profesor/:matId/:profId',materiaControlador.editarMateriaProfesor);

module.exports = router;
