// course logic
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');
const { success, error } = require('../utils/response');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const teacher = req.user.id;
    const course = await Course.create({ title, description, category, teacher });
    return success(res, { course }, 'Course created', 201);
  } catch (err) { console.error(err); return error(res, err.message); }
};

exports.updateCourse = async (req,res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(id, updates, { new:true });
    return success(res, { course }, 'Course updated');
  } catch (err) { console.error(err); return error(res, err.message); }
};

exports.deleteCourse = async (req,res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    return success(res, {}, 'Course deleted');
  } catch (err) { console.error(err); return error(res, err.message); }
};

exports.getCourse = async (req,res) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate('teacher','name email');
  return success(res, { course }, 'Course fetched');
};

exports.listCourses = async (req,res) => {
  const q = req.query.q || '';
  const courses = await Course.find({ title: new RegExp(q, 'i') }).populate('teacher','name');
  return success(res, { courses }, 'Courses list');
};

exports.enroll = async (req,res) => {
  try {
    const user = req.user.id;
    const { courseId } = req.body;
    const enrollment = await Enrollment.create({ user, course: courseId });
    return success(res, { enrollment }, 'Enrolled', 201);
  } catch (err) {
    if (err.code===11000) return error(res, 'Already enrolled', 400);
    console.error(err); return error(res, err.message);
  }
};

exports.getEnrolledStudents = async (req,res) => {
  const { id } = req.params; // course id
  const enrollments = await Enrollment.find({ course: id }).populate('user','name email');
  return success(res, { students: enrollments }, 'Enrolled students');
};
