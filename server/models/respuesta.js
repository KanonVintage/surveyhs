var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RespuestaSchema = new Schema({
  _id: {
    type: String,
    'default': require('shortid').generate
  },
  fermentacion: {
    type: String
  },
  tipo: {
    type: String
  },
  pepa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pepa'
  },
  experto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experto'
  }
},{timestamps: true, versionKey: false, collection: 'respuestas'});

RespuestaSchema.methods.crearRespuesta = function(callback) {
  this.save(callback);
}

RespuestaSchema.statics.obtenerTodasPepas = function(callback) {
	this.find({}).populate({path: 'pepas'}).exec(callback);
}

RespuestaSchema.statics.obtenerGrupo = function(id_pepa,callback) {
  this.findOne({_id: id_pepa}).populate({path: 'pepas'}).exec(callback);
}

RespuestaSchema.statics.obtenerRespuestaPorExperto = function(id_experto, callback) {
  this.find({experto: id_experto}, callback)
}

module.exports = mongoose.model("Respuesta", RespuestaSchema);
