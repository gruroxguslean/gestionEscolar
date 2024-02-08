const express = require('express');
const session = require('express-session');
const profesorRutas = require('./rutas/profesorRutas')
const seccionRutas = require('./rutas/seccionRutas')
const materiaRutas = require('./rutas/materiaRutas')
const eventoRutas = require('./rutas/eventoRutas')

// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'millavesecreta',
  resave: false,
  saveUninitialized: true
}));

// rutas
app.get('/', (req,res)=>{
  res.render('index', {});
})
app.use('/profesores',profesorRutas);
app.use('/secciones',seccionRutas);
app.use('/materias',materiaRutas);
app.use('/eventos',eventoRutas);

const server = app.listen(3000,()=>{
  console.log('Servidor iniciado en el puerto 3000')
})

module.exports = server;
