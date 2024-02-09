const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})
/*
describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado las materias", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Biología"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Biología"}])
    const response2 = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Matemáticas"});
    expect(response2.status).toBe(200);
    expect(response2.body.materias).toEqual([{nombre:"Biología"},{nombre:"Matemáticas"}])
  })
})
*/

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Biología"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Biología"}])
    const response2 = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Matemáticas"});
    expect(response2.status).toBe(200);
    expect(response2.body.materias).toEqual([{nombre:"Biología"},{nombre:"Matemáticas"}])
    const response3 = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Antonio",cedula:"40287492",materias:[0,1]});
    expect(response3.status).toBe(200);
    expect(response3.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"}])
    expect(response3.body.materias).toEqual([0,1])
  })
})

describe("GET /profesores/mostrar-profesores-materia",()=>{
  it("deberia retornar de forma exitosa los profesores con sus respectivas materias", async () => {
    const response = await agent.get("/profesores/mostrar-profesores-materia").type('json');
    expect(response.status).toBe(200);
    expect(response.body.profesorMateria).toEqual([{nombreProfesor:"Antonio",nombreMateria:"Biología"},{nombreProfesor:"Antonio",nombreMateria:"Matemáticas"}])
  })
})

describe("GET /profesores/mostrar-proximos-eventos",()=>{
  it("deberia retornar de forma exitosa los proximos eventos del profesor", async () => {
    const hoy = new Date();
    const proximoDia = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate()+1,12,0,0);
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:proximoDia.toJSON(),tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:proximoDia.toJSON(),tipo:0}]);
    const pasadoMannana = new Date(hoy.getFullYear(),hoy.getMonth(),hoy.getDate()+2,12,0,0);
    const response2 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:pasadoMannana.toJSON(),tipo:0});
    expect(response2.status).toBe(200);
    expect(response2.body.eventos).toEqual([{claseId:0,fecha:proximoDia.toJSON(),tipo:0},{claseId:0,fecha:pasadoMannana.toJSON(),tipo:0}]);
    const siguienteMes = new Date(hoy.getFullYear(),hoy.getMonth()+1,hoy.getDate(),12,0,0)
    const response3 = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:siguienteMes.toJSON(),tipo:0});
    expect(response3.status).toBe(200);
    expect(response3.body.eventos).toEqual([{claseId:0,fecha:proximoDia.toJSON(),tipo:0},{claseId:0,fecha:pasadoMannana.toJSON(),tipo:0},{claseId:0,fecha:siguienteMes.toJSON(),tipo:0}]);
    const response4 = await agent.get("/profesores/mostrar-proximos-eventos/0").set('Accept', 'application/json').type('json');
    expect(response4.status).toBe(200);
    expect(response4.body.profesoresProximosEventos).toEqual({"Antonio":[{claseId:0,fecha:proximoDia.toJSON(),tipo:0},{claseId:0,fecha:pasadoMannana.toJSON(),tipo:0}]})
  })
})
