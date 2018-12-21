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
    type: String,
    ref: 'Pepa'
  },
  experto: {
    type: String,
    ref: 'Experto'
  },
  survey: {
    type: String,
    ref: 'Survey'
  }
},{timestamps: true, versionKey: false, collection: 'respuestas'});


RespuestaSchema.statics.obtenerTodasRespuestas = function(callback) {
	this.find({}).populate('pepa','_id').populate('experto', '_id nombre').populate('survey', '_id').exec(callback);
}

RespuestaSchema.statics.obtenerRespuestas = function(id_pepa,callback) {
  this.find({pepa: id_pepa}).populate('pepa','_id').populate('experto', '_id nombre').populate('survey', '_id').exec(callback);
}

RespuestaSchema.statics.obtenerRespuestasPorExperto = function(id_experto, callback) {
  this.find({experto: id_experto}).populate('pepa','_id').populate('experto', '_id nombre').populate('survey', '_id').exec(callback);
}

module.exports = mongoose.model("Respuesta", RespuestaSchema);
