const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado las materias", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Literatura"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Literatura"}])
    const response2 = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Historia"});
    expect(response2.status).toBe(200);
    expect(response2.body.materias).toEqual([{nombre:"Literatura"},{nombre:"Historia"}])
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Anita",cedula:"42084124",materias:[0,1]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Anita",cedula:"42084124"}])
    expect(response.body.materias).toEqual([0,1])
  })
})

describe("POST /secciones/ingresar-seccion",()=>{
  it("deberia retornar de forma exitosa si se ha creado la seccion", async () => {
    const response = await agent.post("/secciones/ingresar-seccion").type('json').send({nombre:"A",clases:[0,1]});
    expect(response.status).toBe(200);
    expect(response.body.secciones).toEqual([{nombre:"A"}])
  })
})
