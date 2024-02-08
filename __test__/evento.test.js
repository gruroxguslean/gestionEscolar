const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado las materias", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Física"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Física"}])
    const response2 = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Química"});
    expect(response2.status).toBe(200);
    expect(response2.body.materias).toEqual([{nombre:"Física"},{nombre:"Química"}])
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Alejandro",cedula:"44985023",materias:[0,1]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Alejandro",cedula:"44985023"}])
    expect(response.body.materias).toEqual([0,1])
  })
})

describe("POST /eventos/ingresar-evento",()=>{
  it("deberia retornar de forma exitosa si se ha creado el evento", async () => {
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2024-02-11T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-11T12:00:00-04:00",tipo:0}])
  })
})

