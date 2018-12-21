var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var ExpertoSchema = new Schema({
  _id: {
    type: String,
    'default': require('shortid').generate
  },
  nombre: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trabajo: {
    type: String
  }
}, {timestamps: true, versionKey: false, collection: 'expertos'});

ExpertoSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

ExpertoSchema.methods.crearExperto = function(callback) {
  this.save(callback);
}

ExpertoSchema.methods.compararPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

ExpertoSchema.statics.obtenerExperto = function(id_experto,callback) {
  this.findOne({_id: id_experto}).exec(callback);
}


module.exports = mongoose.model("Experto", ExpertoSchema);
