// user logic
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { success, error } = require('../utils/response');

exports.getProfile = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).select('-password');
  return success(res, { user }, 'Profile fetched');
};

exports.updateProfile = async (req, res) => {
  const id = req.user.id;
  const updates = req.body;
  delete updates.password;
  const user = await User.findByIdAndUpdate(id, updates, { new:true }).select('-password');
  return success(res, { user }, 'Profile updated');
};

exports.changePassword = async (req, res) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return error(res, 'Missing fields', 400);
  const user = await User.findById(id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return error(res, 'Old password incorrect', 400);
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
  return success(res, {}, 'Password changed');
};

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  return success(res, { users }, 'Users list');
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return success(res, {}, 'User deleted');
};
