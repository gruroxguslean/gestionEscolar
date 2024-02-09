const Evento = require('../modelos/evento');

const crearGet = (req,res) => {
}

const crearPost = (req,res) => {
  const tipo = req.body.tipo;
  const claseId = req.body.claseId;
  const fecha = req.body.fecha;
  /*var [ anno, mes, dia ] = req.body.fecha.split('-').map(f=>Number(f));
  const hora = Number(req.body.hora.split(':')[0]);
  if(mes > 1) mes = mes - 1;
  else {
    mes = 12
    anno = anno - 1
  }
  const fecha = new Date(anno,mes,dia,hora,0,0);*/

  const evento = new Evento(tipo,claseId,fecha);

  if(!req.session.eventos)
    req.session.eventos = [];
  req.session.eventos.push(evento);
  
  res.status(200).json({message:"Evento creado",eventos:req.session.eventos});

}

const editar = (req,res) => {
  const eventoId = req.params.id;
  req.session.eventos[eventoId].tipo = req.body.tipo;
  req.session.eventos[eventoId].fecha = req.body.fecha;
  req.session.eventos[eventoId].claseId = req.body.claseId;

  res.status(200).json({message:"Evento editado",eventos:req.session.eventos});
}

const eliminar = (req,res) => {
  const eventoId = req.params.id;
  req.session.eventos.splice(eventoId,1)
  res.status(200).json({message:"Evento eliminado",eventos:req.session.eventos});
}


module.exports = {
  crearGet,
  crearPost,
  editar,
  eliminar
}
