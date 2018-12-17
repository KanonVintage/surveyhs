var router = require('express').Router()
var PepaController = require('../controllers/pepa.controller');
//CRUD
router.get('/:id_pepa', PepaController.obtenerPepa);
router.get('/all', PepaController.obtenerTodasPepas);
router.post('/', PepaController.crearPepa);

module.exports = router;