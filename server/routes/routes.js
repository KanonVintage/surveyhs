module.exports = (app) => {
    app.use('/survey', require('./survey.router'));

  }