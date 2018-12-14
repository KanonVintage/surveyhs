var router = require('express').Router()
var SurveyController = require('../controllers/survey.controller');
//CRUD
router.get('/:id_survey', SurveyController.obtenerSurvey);
router.post('/', SurveyController.crearSurvey);

module.exports = router;