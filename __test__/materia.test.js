const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})


describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Biología"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Biología"}]);
  })
})

describe("PUT /materias/editar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.put("/materias/editar-materia/0").type('json').send({nombre:"Inglés"});
    expect(response.status).toBe(200);
    expect(response.body.materia).toEqual({nombre:"Inglés"});
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Antonio",cedula:"40287492",materias:[0]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"}]);
    expect(response.body.materias).toEqual([0]);
  })
})

describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Premilitar"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Inglés"},{nombre:"Premilitar"}]);
  })
})

describe("PUT /materias/editar-materia-profesor/:matId/:profId", ()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.put("/materias/editar-materia-profesor/0/0").type('json').send({nuevoProfId:0,nuevoMatId:1});
    expect(response.status).toBe(200);
    expect(response.body.clase).toEqual({profId:0,matId:1,secId:null});
  })
})


describe("GET /materias/mostrar-eventos-por-semana/:id",()=>{

  it("deberia de devolver un json con los eventos organizados primero por año y luego por semana", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Nicolas",cedula:"43085024",materias:[0]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"},{nombre:"Nicolas",cedula:"43085024"}]);
    expect(response.body.materias).toEqual([0]);

    Date.prototype.getWeek = function () {
      // Obtenemos el primer día del año
      let primeroEnero = new Date(this.getFullYear(), 0, 1);
      let sem1 = new Date(primeroEnero.getFullYear(),primeroEnero.getMonth(),primeroEnero.getDate()-primeroEnero.getDay()+1)
      // Calculamos el número de semana
      return Math.floor( (this.getTime()-sem1.getTime())/(1000*60*60*24*7) +1 );
    };

    const hoy = new Date();
    //const proximoDia = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate()+1,12,0,0);
    const fechaAleatoria = (inicio,fin) => new Date(inicio.getTime()+Math.random()*(fin.getTime()-inicio.getTime()));

    const proximoDomingo = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate()+(7-hoy.getDay()),23,59,59);
    const aleSemanaActual = fechaAleatoria(hoy,proximoDomingo);
    const response1 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0});
    expect(response1.status).toBe(200);
    expect(response1.body.eventos).toEqual([{claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0}]);

    const lunesSegundo = new Date(proximoDomingo.getFullYear(),proximoDomingo.getMonth(),proximoDomingo.getDate()+1,0,0,0 );
    const domingoSegundo = new Date(proximoDomingo.getFullYear(),proximoDomingo.getMonth(),proximoDomingo.getDate()+7,23,59,59 );
    const aleSemanaSegunda = fechaAleatoria(lunesSegundo,domingoSegundo);
    const response2 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:aleSemanaSegunda.toJSON(),tipo:0});
    expect(response2.status).toBe(200);
    const aleSemanaSegunda2 = fechaAleatoria(lunesSegundo,domingoSegundo);
    const response3 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:aleSemanaSegunda2.toJSON(),tipo:0});
    expect(response3.status).toBe(200);
    expect(response3.body.eventos).toEqual([{claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda2.toJSON(),tipo:0}]);

    const lunesTercero = new Date(proximoDomingo.getFullYear(),proximoDomingo.getMonth(),proximoDomingo.getDate()+8,0,0,0 );
    const domingoTercero = new Date(proximoDomingo.getFullYear(),proximoDomingo.getMonth(),proximoDomingo.getDate()+14,23,59,59 );
    const aleSemanaTercera = fechaAleatoria(lunesTercero,domingoTercero);
    const response4 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:aleSemanaTercera.toJSON(),tipo:0});
    expect(response4.status).toBe(200);
    expect(response4.body.eventos).toEqual([{claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda2.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaTercera.toJSON(),tipo:0}]);

    const annoProximo = new Date(hoy.getFullYear()+1,hoy.getMonth(),hoy.getDate(),0,0,0);
    const response5 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:annoProximo.toJSON(),tipo:0});
    expect(response5.status).toBe(200);
    expect(response5.body.eventos).toEqual([{claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda2.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaTercera.toJSON(),tipo:0},{claseId:0,fecha:annoProximo.toJSON(),tipo:0}]);

    const response6 = await agent.get("/materias/mostrar-eventos-por-semana/0").set('Accept', 'application/json');
    expect(response6.status).toBe(200);
    expect(response6.body.eventosAnnoSemana).toEqual({[hoy.getFullYear()]:{[hoy.getWeek()]:[{claseId:0,fecha:aleSemanaActual.toJSON(),tipo:0}],[hoy.getWeek()+1]:[{claseId:0,fecha:aleSemanaSegunda.toJSON(),tipo:0},{claseId:0,fecha:aleSemanaSegunda2.toJSON(),tipo:0}],[hoy.getWeek()+2]:[{claseId:0,fecha:aleSemanaTercera.toJSON(),tipo:0}]},[hoy.getFullYear()+1]:{[annoProximo.getWeek()]:[{claseId:0,fecha:annoProximo.toJSON(),tipo:0}]}})
  })

  it("deberia de devolver una vista con los eventos organizados primero por año y luego por semana", async () => {
    const response = await agent.get("/materias/mostrar-eventos-por-semana/0").set('Accept', 'text/html');
    expect(response.status).toBe(200);
		expect(response.type).toBe('text/html');
  })

})

