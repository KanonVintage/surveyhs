var router = require('express').Router()
var ExpertoController = require('../controllers/experto.controller');
//CRUD
router.get('/:id_experto', ExpertoController.obtenerExperto);
router.post('/', ExpertoController.crearExperto);
router.post('/login', ExpertoController.realizarLogin);

module.exports = router;