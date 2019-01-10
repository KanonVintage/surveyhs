var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveyExpertoSchema = new Schema({
    _id: {
        type: String,
        'default': require('shortid').generate
    },
    experto: {
        type: String,
        ref: 'Experto'
    },
    survey: {
        type: String,
        ref: 'Survey'
    },
    activo: {
        type: Boolean
    },
},{timestamps: true, versionKey: false, collection: 'surveyExpertos'});

SurveyExpertoSchema.methods.crearSurveyExperto = function(callback) {
    this.save(callback);
}

SurveyExpertoSchema.statics.obtenerSurveyExperto = function(id_experto, callback) {
this.findOne({experto: id_experto, activo: true})
    .exec(callback);
}


module.exports = mongoose.model("SurveyExperto", SurveyExpertoSchema);
