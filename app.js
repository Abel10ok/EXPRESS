const express = require("express");

const app = express();

//curso simula base de datos.

const { infoCursos } = require("./data/cursos.js");

//routers
const routerProgramacion = require("./routers/programacion");
app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = require("./routers/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

//manejar rutas express
app.get("/", (req, res) => {
  res.send("Mi primer servidor con express");
});

//es comun escribir la palabra api .
app.get("/api/cursos", (req, res) => {
  res.end(JSON.stringify(infoCursos));
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log("escuchando");
});
