const express = require("express");

const { programacion } = require("../data/cursos").infoCursos;

const routerProgramacion = express.Router();

//MIDDLEWARE
routerProgramacion.use(express.json()); //procesar cuerpo solicitud formato json, para poder trabajar como la propiedad body.

routerProgramacion.get("/", (req, res) => {
  res.json(programacion);
});

//cursos programacion
//optimo, (:lenguaje => un parametro url)
// app.get("/api/cursos/programacion/:lenguaje", (req, res) => {
//   const lenguaje = req.params.lenguaje;
//   const resultado = infoCursos.programacion.filter(
//     (curso) => curso.lenguaje === lenguaje
//   );
//   if (resultado.length === 0) {
//     return res.status(404).end(`no se encontraron cursos de ${lenguaje}`);
//   }
//   res.send(JSON.stringify(resultado));
// });

//parametros query (de busqueda)?clave = valor.
routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);
  if (resultado.length === 0) {
    return res.status(404).end(`no se encontraron cursos de ${lenguaje}`);
  }
  if (req.query.ordenar === "vistas") {
    res.send(JSON.stringify(resultado.sort((a, b) => b.vistas + a.vistas)));
  } else {
    res.send(JSON.stringify(resultado));
  }
  console.log(req.query.ordenar);
  res.send(JSON.stringify(resultado));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultado = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultado.length === 0) {
    // return res
    //   .status(404)
    //   .end(`no se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    return res.status(204).end();
  }
  res.send(JSON.stringify(resultado));
});

//POST .

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body; //extraer cuerpo solicitud
  programacion.push(cursoNuevo);
  res.end(JSON.stringify(programacion));
});

//PUT .

routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id); //encontrar indice de in elemento en un arreglo.

  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

//PATH  especificar solo lo que queremos cambiar sin la nesecidad de pasar todas las claves valor.

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada); //pasar un objeto que vamos a modificar y otro objeto que tiene propiedades y valores.
  }
  res.send(JSON.stringify(programacion));
});

// DELETE .

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    programacion.splice(indice, 1);
  }
  res.send(programacion); // POR DEFECTO ENVIA EN FORMATO JSON NO HACE FALTA JSON.STRINGIFY.
});

module.exports = routerProgramacion;

//codigos de estados.
