const PepaModel = require('../models/pepa');
var respuesta = require('../utils/responses');


const crearPepa= (req, res) => {
    let Pepa = new PepaModel({
      fotoURL        : req.body.fotoURL,
      nombre          : req.body.nombre,
      region          : req.body.region
    });
    Pepa.crearPepa((err, pregunta) => {
      if (err) return respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const obtenerPepa = (req, res) => {
    PepaModel.obtenerPepa(req.params.id_pepa,(err, Pepa) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, Pepa);
    })
  }

  const obtenerTodasPepas = (req, res) => {
    PepaModel.obtenerTodasPepas((err, pepas) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, pepas);
    })
  }

  

  module.exports = {
    obtenerPepa,
    crearPepa,
    obtenerTodasPepas
  }