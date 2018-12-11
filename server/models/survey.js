var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
    _id: {
        type: String,
        'default': require('shortid').generate
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

module.exports = mongoose.model("Survey", SurveySchema);
