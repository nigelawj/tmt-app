const express = require('express');
const router = express.Router();

// @route			GET api/results
// @desc			Get user's test results
// @access		Public
router.get('/', (req, res) => {
  res.send('Get yo results');
});

// @route			DELETE api/results
// @desc			Delete a user's test result
// @access		Private
router.delete('/', (req, res) => {
  res.send('Delete yo results');
});

module.exports = router;