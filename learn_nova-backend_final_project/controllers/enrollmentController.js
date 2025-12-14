// enrollment logic
const Enrollment = require('../models/enrollment');
const { success, error } = require('../utils/response');

exports.listEnrollments = async (req,res) => {
  const enrollments = await Enrollment.find().populate('user','name email').populate('course','title');
  return success(res, { enrollments }, 'Enrollments list');
};

exports.cancelEnrollment = async (req,res) => {
  const { id } = req.params;
  await Enrollment.findByIdAndDelete(id);
  return success(res, {}, 'Enrollment cancelled');
};
