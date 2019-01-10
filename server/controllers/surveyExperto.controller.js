const SurveyExpertoModel = require('../models/surveyExperto');
var respuesta = require('../utils/responses');


const crearSurveyExperto= (req, res) => {
    console.log(req.body);
    let surveyExperto = new SurveyExpertoModel({
      experto       : req.body.experto,
      survey        : req.body.survey,
      activo        : req.body.activo
    });
    surveyExperto.crearSurveyExperto((err, pregunta) => {
      if (err) return respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const activarSurveyExperto= (req, res) => {
    let surveyExperto= new SurveyExpertoModel({
        experto       : req.body.experto,
        survey        : req.body.survey
    });
    SurveyExpertoModel.findOneAndUpdate({$and:[{experto: {$regex: surveyExperto.experto}}, {survey: {$regex: surveyExperto.survey}}]}, {experto: surveyExperto.experto, survey: surveyExperto.survey, activo: true}, {upsert: true},(err, pregunta) => {
      if (err) respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const desactivarSurveyExperto= (req, res) => {
    let surveyExperto= new SurveyExpertoModel({
        experto       : req.body.experto,
        survey        : req.body.survey
    });
    SurveyExpertoModel.findOneAndUpdate({$and:[{experto: {$regex: surveyExperto.experto}}, {survey: {$regex: surveyExperto.survey}}]}, {experto: surveyExperto.experto, survey: surveyExperto.survey, activo: false}, {upsert: true},(err, pregunta) => {
      if (err) respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const obtenerSurveyExperto = (req, res) => {
    SurveyExpertoModel.obtenerSurveyExperto(req.params.id_experto,(err, surveyExperto) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, surveyExperto);
    })
  }

  module.exports = {
    obtenerSurveyExperto,
    crearSurveyExperto,
    activarSurveyExperto,
    desactivarSurveyExperto
  }