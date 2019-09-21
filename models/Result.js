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
  },
  timings: {
    type: [],
    default: []
  },
  totalTime: {
    type: Number
  },
  numErrors: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('result', ResultSchema);
