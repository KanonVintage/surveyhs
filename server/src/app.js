const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/surveys');

var db = mongoose.connection;

var Survey= require("../models/survey");
var Pepa= require("../models/pepa");

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/survey', (req, res) => {
  res.send(
    [{
      title: "Pepa",
      description: "Pepa de cacao Nacional."
    }]
  )
})
/*
app.post('/pepa', (req, res) => {
    new Promise((resolve, reject) => {
        Pepa.crearPepa((err, doc) => {
          if (err) return reject(err);
          res.send(resolve(req.body));
        });
      });
  });

  app.get('/survey', (req, res) => {
    new Promise((resolve, reject) => {
        SurveyModel.obtenerLeccionPopulate(id_leccion, (err, leccion) => {
          if (err) return reject(new Error('No se puedo obtener Leccion'));
          return resolve(leccion);
        });
      })
  })
*/

app.listen(process.env.PORT || 8081)