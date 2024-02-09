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

const editarMateriaProfesor = (req,res) => {
  const profId = req.params.profId;
  const matId = req.params.matId;
  const nuevoProfId = req.body.nuevoProfId;
  const nuevoMatId = req.body.nuevoMatId;

  const claseId = req.session.clases.findIndex(clase=> clase.profId == profId && clase.matId == matId);
  req.session.clases[claseId].profId = nuevoProfId;
  req.session.clases[claseId].matId = nuevoMatId;

  res.status(200).json({message:"Clase editada",clase:req.session.clases[claseId]});

}

const mostrarSemana = (req,res) => {
  const matId = req.params.id;
  const clasesMateria = req.session.clases.filter(clase => clase.matId == matId);
  const eventosFuturos = req.session.eventos.filter(evento=>clasesMateria[evento.claseId] != null && new Date(evento.fecha) >= new Date());
  const eventosAnnoSemana = {};
  eventosFuturos.forEach(evento=>{
    const fecha = new Date(evento.fecha);
    const anno = fecha.getFullYear();
    const semana = fecha.getWeek();
    if(!eventosAnnoSemana[anno])
			eventosAnnoSemana[anno] = {};
		if(!eventosAnnoSemana[anno][semana])
    	eventosAnnoSemana[anno][semana] = [];
    eventosAnnoSemana[anno][semana].push(evento);
  })
  console.log("Mostrando según formato")
	res.format({
		json:	()=> {res.status(200).json({message:"Eventos organizados por semanas del año",eventosAnnoSemana})},
		html: ()=> {
      res.render('mostrarEventosAnnoSemana',{eventosAnnoSemana,materia:req.session.materias[matId].nombre,title:"Eventos por Semana del año"})
    }
	})
  
}


module.exports = {
  crearGet,
  crearPost,
  editar,
  editarMateriaProfesor,
  mostrarSemana
}
