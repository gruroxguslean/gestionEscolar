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
