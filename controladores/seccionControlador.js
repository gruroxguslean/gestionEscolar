const Seccion = require('../modelos/seccion');

const crearGet = (req,res) => {
}

const crearPost = (req,res) => {
  const clasesSeccion = req.body.clases;
  const nombre = req.body.nombre;
  const integrantes = req.body.integrantes;

  const seccion = new Seccion(nombre,integrantes);

  if (req.session.secciones)
    req.session.secciones.push(seccion);
  else
    req.session.secciones = [seccion];
  
  const secId = req.session.secciones.length - 1;

  clasesSeccion.forEach(claseId=>{
    if(!req.session.clases[claseId].seccion)
      req.session.clases[claseId].seccion = secId
  });

  res.status(200).json({message:"Sección Creada",secciones:req.session.secciones,clasesSeccion});
}


module.exports = {
  crearGet,
  crearPost
}
