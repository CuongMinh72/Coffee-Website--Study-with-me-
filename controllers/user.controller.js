// controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.sendStatus(201);
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    // login successful, create session or JWT here
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};