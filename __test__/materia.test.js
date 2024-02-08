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
