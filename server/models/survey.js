var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
    _id: {
        type: String,
        'default': require('shortid').generate
    },
    pepas: [{
        pepa: String,
        ref: 'Pepa'
    }]
},{timestamps: true, versionKey: false, collection: 'surveys'});

SurveySchema.methods.crearSurvey = function(callback) {
    this.save(callback);
  }

var Survey = mongoose.model("Survey", SurveySchema);
module.exports = Survey;