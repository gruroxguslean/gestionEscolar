class Evento {
  constructor(tipo,claseId,fecha){
    this.tipo = tipo;
    this.claseId = claseId;
    this.fecha = fecha;
    const tipos = ['Evaluación', 'Corte de nota', 'Encuentro', 'Video conferencia'];
  }
}
module.exports = Evento;
