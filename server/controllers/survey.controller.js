const SurveyModel = require('../models/survey');
var respuesta = require('../utils/responses');


const crearSurvey= (req, res) => {
  console.log(req.body);
    let survey = new SurveyModel({
      nombre        : req.body.nombre,
      pepas         : req.body.pepas
    });
    survey.crearSurvey((err, pregunta) => {
      if (err) return respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const obtenerSurvey = (req, res) => {
    SurveyModel.obtenerSurvey(req.params.id_survey,(err, survey) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, survey);
    })
  }

  module.exports = {
    obtenerSurvey,
    crearSurvey
  }