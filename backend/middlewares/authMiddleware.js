// auth middleware
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.header('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied. No token.'});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
