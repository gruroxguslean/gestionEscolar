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

