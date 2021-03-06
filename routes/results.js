const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const Result = require('../models/Result');
const auth = require('../middleware/auth');

// @route			GET api/results
// @desc			Get user's test results
// @access		Private
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

  const { timings, numErrors, totalTime } = req.body;

  try {
    const newResult = new Result({
      timings: timings,
      numErrors: numErrors,
      totalTime: totalTime,
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

// @route			GET api/results/:id
// @desc			Get a patient's test results
// @access		Private
router.get('/:id', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.id }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			DELETE api/results/:id
// @desc			Delete a user's test result
// @access		Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ msg: 'Result not found' });
    }

    // Make sure user owns result
    if (result.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Result.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Result removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
