const Materia = require('../modelos/materia');

Date.prototype.getWeek = function () {

  // Obtenemos el primer día del año
  let primeroEnero = new Date(this.getFullYear(), 0, 1);
  let sem1 = new Date(primeroEnero.getFullYear(),primeroEnero.getMonth(),primeroEnero.getDate()-primeroEnero.getDay()+1)

  // Calculamos el número de semana
  return Math.floor( (this.getTime()-sem1.getTime())/(1000*60*60*24*7) +1 );
};

const crearGet = (req,res) => {
}

const crearPost = (req,res) => {
  const nombre = req.body.nombre;
  const materia = new Materia(nombre);
  
  if (!req.session.materias)
    req.session.materias = [];

  req.session.materias.push(materia);

  res.status(200).json({message:"Materia Creada",materias:req.session.materias});

}

const editar = (req,res) => {
  const id = req.params.id;
  if(req.session.materias[id]){
    req.session.materias[id].nombre = req.body.nombre;
    res.status(200).json({message:"Materia Editada",materia:req.session.materias[id]});
  }
  else
    res.status(300).json({message:"No se encuentra el id de la materia"});
}


module.exports = {
  crearGet,
  crearPost,
  editar
}
