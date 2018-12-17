var router = require('express').Router()
var RespuestaController = require('../controllers/respuesta.controller');
//CRUD
router.get('/:id_pepa', RespuestaController.obtenerRespuestas);
router.get('/experto/:id_experto', RespuestaController.obtenerRespuestasPorExperto);
router.get('/all', RespuestaController.obtenerTodasRespuestas);
router.post('/', RespuestaController.crearRespuesta);

module.exports = router;