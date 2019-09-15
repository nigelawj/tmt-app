const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Route Middlewares
const auth = require('../middleware/auth');

// @route			GET api/list/patients
// @desc			Get namelist of all patients tagged to a doctor
// @access		Private
router.get('/patients', auth, async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id).select('assignedUsers');

    let patients = [];
    for (let i = 0; i < doctor.assignedUsers.length; i++) {
      patients[i] = await User.findById(doctor.assignedUsers[i]).select('name');
    }

    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			GET api/list/doctors
// @desc			Get list of all doctors
// @access		Public
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ type: 'doctor' })
      .select('-password')
      .sort({ name: 1 });
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			PUT api/list/share
// @desc			Share/Unshare result with the doctor
// @access		Private
router.put('/share/:id', auth, async (req, res) => {
  const { doctorID } = req.body;

  try {
    // update user's doctor list
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }
    let updatedUser = null;
    if (user.doctors.includes(doctorID)) {
      updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: {
            doctors: user.doctors.filter(
              doctor => doctor.toString() !== doctorID.toString()
            )
          }
        },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: {
            doctors: [...user.doctors, doctorID]
          }
        },
        { new: true }
      );
    }

    // update doctor's assignedUsers list
    let doctor = await User.findById(doctorID);
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    if (doctor.assignedUsers.includes(req.user.id)) {
      await User.findByIdAndUpdate(
        doctorID,
        {
          $set: {
            assignedUsers: doctor.assignedUsers.filter(
              user => user.toString() !== req.user.id.toString()
            )
          }
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        doctorID,
        {
          $set: {
            assignedUsers: [...doctor.assignedUsers, req.user.id]
          }
        },
        { new: true }
      );
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route			GET api/list/:id
// @desc			Get account details of specific user
// @access		Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
