![Logo UVM](public/LOGOUVM.png)

# Sistema de Gestión Escolar
En este proyecto se hizo uso de variables de sesión, para poder almacenar temporalmente las variables en el servidor y así poder implementar los siguientes endpoints: 

### 1. /materias

|Sub-ruta|Método|Descripción|
|---|---|---|
|/ingresar-materia | GET | Muestra el formulario para el ingreso de la materia |
|/ingresar-materia | POST | Recibe el parametro _nombre_ para almacenar la materia <br> __Retorna__ las _materias_ creadas hasta ahora |
|/editar-materia/:id | PUT | Recibe el parametro _nombre_, ademas del _id_ de la ruta para editar la materia <br> __Retorna__ la _materia_ editada |
|/editar-materia-profesor/:matId/:profId | PUT | Recibe los parametros _nuevoProfId_ y _nuevoMatId_, ademas de _matId_ y _profId_ de la ruta para editar la relación mediante mediante la relación con __Clase__ <br> __Retorna__ la _clase_ editada |
|/mostrar-eventos-por-semana/:id | GET | Recibe el parametro de ruta _id_ de la materia de la cual se quiere obtener los eventos organizados primero por año y luego por numero de semana <br> __Retorna__ el objeto _eventosAnnoSemana_ con todos los eventos organizados |

### 2. /profesores

|Sub-ruta|Método|Descripción|
|---|---|---|
|/ingresar-profesor | GET | Muestra el formulario para el ingreso de la materia |
|/ingresar-profesor | POST | Recibe el parametro _nombre_ y un array de ids de _materias_ las cuales el profesor va a impartir <br> __Retorna__ los _profesores_ creados hasta ahora |
|/mostrar-profesores-materia | GET | Muestra los nombres de los profesores que están relacionados con sus materias  |
|/mostrar-proximos-eventos/:id | GET | Muestra los proximos de eventos de todos los profesores a partir de dentro de 2 semanas |
|/eliminar-profesor-materia/:id | DELETE | Elimina la _clase_ con el _id_ proporcionado en la ruta <br> __Retorna__ las _clases_ que se quedaron almacenadas después de la eliminación |

### 3. /eventos

|Sub-ruta|Método|Descripción|
|---|---|---|
|/ingresar-evento | GET | Muestra el formulario para el ingreso del evento |
|/ingresar-evento | POST | Recibe los parametros _tipo_, _claseId_ y _fecha_ para almacenar el evento <br> __Retorna__ los _eventos_ hasta ahora creados  |
|/editar-evento/:id | PUT | Recibe los parametros _tipo_, _claseId_ y _fecha_ para editar el evento <br> __Retorna__ los _eventos_ hasta ahora almacenados después de la edición  |
|/eliminar-evento/:id | DELETE | Elimina el evento con _id_ proporcionado en la ruta <br> __Retorna__ los _eventos_ hasta ahora despues de la eliminación |

### 4. /secciones

|Sub-ruta|Método|Descripción|
|---|---|---|
|/ingresar-seccion | GET | Muestra el formulario para el ingreso de la sección |
|/ingresar-seccion | POST | Recibe los parametros _clases_ la cuál es un arreglo de las clases en la cual va a cursar la sección, _integrantes_ el cuál es un array de integrantes (se pueden identificar como sea) y el _nombre_ de la sección <br> __Retorna__ las _secciones_ hasta ahora creadas  |

Para poder realizar la gestión de todos estos endpoint se creó una nueva entidad __Clase__ la cual se encuentra relacionada con todas estas entidades

## Instalación

Para esta instalación se requiere tener instalado __Git__ y __NodeJS__. Además de un editor de código como __Visual Studio Code__

Para poder instalar esta aplicación sólo se requiere ubicarse en el directorio deseado y ejecutar 

```bash
git clone https://github.com/gruroxguslean/gestionEscolar
```

Luego realizar ubicarse dentro del diretorio e instalar las librerias mediante el siguiente comando:

```bash
npm install
```

Para poner en marcha la aplicación se usar <code>nodemon</code> o <code>npm start</code>

Para hacer las pruebas se usó la librería de pruebas __Jest__ y __Supertest__. Para correr las pruebas solamente hay que correr el siguiente comando en el terminal

```bash
npm run test
```
