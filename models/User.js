const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  IC: {
    type: String
    //required: true,
    //unique: true
  },
  type: {
    //can be appUser or doctor
    type: String,
    default: 'appUser'
  },
  password: {
    type: String,
    required: true
  },
	assignedDoctor: {
		// The doctor assigned to the user
		type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
	},
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
