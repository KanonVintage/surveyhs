var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
    _id: {
        type: String,
        'default': require('shortid').generate
    },
    nombre: {
        type: String
    },
    pepas: [{
        pepa: {
            type: String,
            ref: 'Pepa'
        }
    }]
},{timestamps: true, versionKey: false, collection: 'surveys'});

SurveySchema.methods.crearSurvey = function(callback) {
    this.save(callback);
}

SurveySchema.statics.obtenerSurvey = function(id_survey, callback) {
this.findOne({_id: id_survey})
    .populate('pepas.pepa')
    .exec(callback);
}


module.exports = mongoose.model("Survey", SurveySchema);
