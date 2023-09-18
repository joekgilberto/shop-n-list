const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A User schema used in Google OAuth that holds a name, a Google ID, email, and avatar
const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String
});

module.exports = mongoose.model('User', userSchema);