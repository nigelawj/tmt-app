const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Result = require('../models/Result');

const auth = require('../middleware/auth');

// @route			GET api/results
// @desc			Get user's test results
// @access		Public
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			POST api/results
// @desc			Add a user's test result
// @access		Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { timings, numErrors } = req.body;

  try {
    const newResult = new Result({
      timings: timings,
      numErrors: numErrors,
      name: req.user.name,
      user: req.user.id
    });
    const savedResult = await newResult.save();
    res.json(savedResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			DELETE api/results
// @desc			Delete a user's test result
// @access		Private
router.delete('/', (req, res) => {
  res.send('Delete yo results');
});

module.exports = router;
