const Profesor = require('../modelos/profesor');
const Clase = require('../modelos/clase');

const crearGet = (req,res) => {
}

const crearPost = (req,res) => {
  const nombre = req.body.nombre;
  const cedula = req.body.cedula;
  const materias = req.body.materias;

  if(!materias.every(i=>req.session.materias[i]))
    res.status(300).json({message:"Materias no definidas"});

  const profesor = new Profesor(nombre,cedula);

  if (req.session.profesores)
    req.session.profesores.push(profesor);
  else
    req.session.profesores = [profesor];

  const profId = req.session.profesores.length - 1;

  materias.forEach(matId=>{
    const clase = new Clase(matId,profId,null);
    if (!req.session.clases)
      req.session.clases = [];
    req.session.clases.push(clase);
  }) 

  res.status(200).json({message:"Profesor Creado",profesores:req.session.profesores,materias});
}

const mostrarProfesorMateria = (req,res) => {
  const clases = req.session.clases;
  if (clases){
    const profesorMateria = clases.sort((a,b)=>{
      if(a.profId !== b.profId)
        return a.profId - b.profId;
      else
        return a.matId - b.matId;
    }).map(clase=>({nombreProfesor:req.session.profesores[clase.profId].nombre,nombreMateria:req.session.materias[clase.matId].nombre}));
    res.status(200).json({message:"Profesores y materias ordenados",profesorMateria});
  }
  else
    res.status(300).json({message:"No existen clases registradas"});
}

const mostrarProximosEventos = (req,res) => {
	const profesoresProximosEventos = {};
	req.session.profesores.forEach((profesor,profId)=>{
		const clasesProfId = req.session.clases.reduce((indices,clase,i)=>{
			if(clase.profId == profId) indices.push(i)
			return indices
		},[]);
		const fechaLimite = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 días después de ahora en milisegundos
		const proximosEventos = req.session.eventos.filter(evento => clasesProfId.includes(evento.claseId) && new Date(evento.fecha) >= new Date() && new Date(evento.fecha) <= fechaLimite);
		profesoresProximosEventos[profesor.nombre] = proximosEventos;
	})
	res.status(200).json({message:"Proximos eventos del profesor",profesoresProximosEventos})
}

const eliminarProfesorMateria = (req,res) => {
  const profId = req.params.id;
  const matId = req.body.matId;

  req.session.clases = req.session.clases.filter(clase=> clase.profId != profId || clase.matId != matId);
  
  res.status(200).json({message:"Eliminada Asociación Profesor Materia",clases:req.session.clases});
}

module.exports = {
  crearGet,
  crearPost,
  mostrarProfesorMateria,
  mostrarProximosEventos,
  eliminarProfesorMateria
}
