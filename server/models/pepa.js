var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PepaSchema = new Schema({
  _id: {
    type: String,
    'default': require('shortid').generate
  },
  fotoURL: {
    type: String
  },
  region: {
    type: String
  }
}, {timestamps: true, versionKey: false, collection: 'pepas'});

PepaSchema.methods.crearPepa = function(callback) {
  this.save(callback);
}

PepaSchema.statics.obtenerTodasPepas = function(callback) {
	this.find({}).populate({path: 'pepas'}).exec(callback);
}

PepaSchema.statics.obtenerPepa = function(id_pepa,callback) {
  this.findOne({_id: id_pepa}).populate({path: 'pepas'}).exec(callback);
}

PepaSchema.statics.obtenerPepaPorRegion = function(region_pepa, callback) {
  this.find({region: region_pepa}, callback)
}

var Pepa = mongoose.model("Pepa", PepaSchema);
module.exports = Pepa;



