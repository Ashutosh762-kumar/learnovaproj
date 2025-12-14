// course routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const courseCtrl = require('../controllers/courseController');

router.get('/', courseCtrl.listCourses);
router.get('/:id', courseCtrl.getCourse);
router.post('/', auth, role(['teacher','admin']), courseCtrl.createCourse);
router.put('/:id', auth, role(['teacher','admin']), courseCtrl.updateCourse);
router.delete('/:id', auth, role(['teacher','admin']), courseCtrl.deleteCourse);

router.post('/enroll', auth, courseCtrl.enroll);
router.get('/:id/enrolled', auth, role(['teacher','admin']), courseCtrl.getEnrolledStudents);

module.exports = router;
