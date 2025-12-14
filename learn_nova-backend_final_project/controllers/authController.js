// auth logic
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/response');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return error(res, 'Missing fields', 400);
    const exists = await User.findOne({ email });
    if (exists) return error(res, 'Email already registered', 400);
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    return success(res, { id: user._id, email: user.email, role: user.role }, 'User registered', 201);
  } catch (err) {
    console.error(err);
    return error(res, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, 'Missing fields', 400);
    const user = await User.findOne({ email });
    if (!user) return error(res, 'Invalid credentials', 400);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return error(res, 'Invalid credentials', 400);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return success(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, 'Login successful');
  } catch (err) {
    console.error(err);
    return error(res, err.message);
  }
};
