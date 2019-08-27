const mongoose = require('mongoose');
const ResultSchema = mongoose.Schema({
  user: {
    // Refer to object ID of each user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
		type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('result', ResultSchema);
