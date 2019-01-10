var router = require('express').Router()
var SurveyExpertoController = require('../controllers/surveyExperto.controller');
//CRUD
router.get('/:id_experto', SurveyExpertoController.obtenerSurveyExperto);
router.post('/', SurveyExpertoController.crearSurveyExperto);
router.post('/activar/', SurveyExpertoController.activarSurveyExperto);
router.post('/desactivar', SurveyExpertoController.desactivarSurveyExperto);

module.exports = router;