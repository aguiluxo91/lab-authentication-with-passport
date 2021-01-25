const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is mandatory',
  },
  password: {
    type: String,
    required: 'Password is required',
  }
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;