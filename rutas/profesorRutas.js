const express = require('express');
const profesorControlador = require('../controladores/profesorControlador');

const router = express.Router();

router.get('/ingresar-profesor',profesorControlador.crearGet);
router.post('/ingresar-profesor',profesorControlador.crearPost);
router.get('/mostrar-profesores-materia',profesorControlador.mostrarProfesorMateria);
router.get('/mostrar-proximos-eventos/:id',profesorControlador.mostrarProximosEventos);
router.delete('/eliminar-profesor-materia/:id',profesorControlador.eliminarProfesorMateria);

module.exports = router;
