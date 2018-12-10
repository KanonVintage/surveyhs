var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExpertoSchema = new Schema({
  _id: {
    type: String,
    'default': require('shortid').generate
  },
  nombre: {
    type: String
  },
  user: {
    type: String
  },
  password: {
    type: String
  },
  trabajo: {
    type: String
  }
}, {timestamps: true, versionKey: false, collection: 'expertos'});

ExpertoSchema.methods.crearExperto = function(callback) {
  this.save(callback);
}

ExpertoSchema.statics.obtenerExperto = function(id_experto,callback) {
  this.findOne({_id: id_experto}).populate({path: 'expertos'}).exec(callback);
}

var Experto = mongoose.model("Experto", ExpertoSchema);
module.exports = Experto;