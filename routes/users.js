const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route			POST api/users
// @desc			Register a user
// @access		Public
router.post(
  '/',
  [
    check('name', 'Please add a name?!')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
    // TO-DO: Add custom check for IC
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      IC,
      type,
      password,
      assignedDoctor,
      dateCreated
    } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        //if user exists
        return res.status(400).json({ msg: 'User already exists!' });
      }

      //create new user
      user = new User({
        name,
        email,
        type,
        password,
        assignedDoctor,
        dateCreated
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
          name: user.name
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000 //expires in -- seconds
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
