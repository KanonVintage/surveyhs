const ExpertoModel = require('../models/experto');
var respuesta = require('../utils/responses');


const crearExperto= (req, res) => {
    let experto = new ExpertoModel({
      nombre        : req.body.nombre,
      user          : req.body.user,
      password      : req.body.password,
      trabajo       : req.body.trabajo
    });
    experto.crearExperto((err) => {
      if (err) return respuesta.serverError(res);
      return respuesta.creado(res);
    });
  }

  const realizarLogin= (req, res) =>{
    ExpertoModel.findOne({user: req.body.user}, function(err,user){
      if (err) return respuesta.serverError(res);

      if (user!= null){
        user.compararPassword(req.body.password, function(err,isMatch){
          if (err) return respuesta.serverError(res);
          var loginToken= {};
          loginToken.experto= user._id;
          loginToken.nombre= user.nombre;
          loginToken.matched= isMatch;
          return respuesta.ok(res,loginToken);
        });
      } else {
       return respuesta.urlNoValido(res);
      }
      

    });

  };

  const obtenerExperto = (req, res) => {
    ExpertoModel.obtenerExperto(req.params.id_experto,(err, experto) => {
      if (err) return respuesta.serverError(res);
      return respuesta.ok(res, experto);
    })
  }

  module.exports = {
    obtenerExperto,
    crearExperto,
    realizarLogin
  }