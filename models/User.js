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
  nric: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    default: 'appUser'
  },
  practicingCertNo: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  doctors: {
    // The doctors the user has shared the results with
    type: [mongoose.Schema.Types.ObjectId]
  },
  assignedUsers: {
    // The users' results that have been shared with this doctor
    type: [mongoose.Schema.Types.ObjectId]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
