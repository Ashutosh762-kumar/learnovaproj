// response helper
exports.success = (res, data = {}, message = 'OK', status = 200) => {
  return res.status(status).json({ message, data });
};

exports.error = (res, message = 'Server Error', status = 500) => {
  return res.status(status).json({ message });
};
