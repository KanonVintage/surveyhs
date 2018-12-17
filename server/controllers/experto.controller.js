const ExpertoModel = require('../models/experto');
var respuesta = require('../utils/responses');


const crearExperto= (req, res) => {
    let experto = new ExpertoModel({
      nombre        : req.body.nombre,
      user          : req.body.user,
      password      : req.body.password,
      trabajo       : req.body.trabajo
    });
    experto.crearExperto((err, pregunta) => {
      if (err) return respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const obtenerExperto = (req, res) => {
    ExpertoModel.obtenerExperto(req.params.id_experto,(err, experto) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, experto);
    })
  }

  module.exports = {
    obtenerExperto,
    crearExperto
  }