module.exports = (app) => {
    app.use('/survey', require('./survey.router'));
    app.use('/experto', require('./experto.router'));
    app.use('/pepa', require('./pepa.router'));
    app.use('/respuesta', require('./respuesta.router'));
  }