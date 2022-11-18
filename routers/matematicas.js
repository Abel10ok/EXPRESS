const express = require("express");

const { matematicas } = require("../data/cursos").infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(matematicas));
});

routerMatematicas.get("/:titulo", (req, res) => {
  const titulo = req.params.titulo;
  const resultado = matematicas.filter((curso) => curso.titulo === titulo);
  if (resultado.length === 0) {
    return res.status(404).end(`no se encontraron titulo de ${titulo}`);
  }
  res.send(JSON.stringify(resultado));
});

module.exports = routerMatematicas;
