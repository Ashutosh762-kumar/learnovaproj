// enrollment routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const enrollCtrl = require('../controllers/enrollmentController');

router.get('/', auth, role(['admin']), enrollCtrl.listEnrollments);
router.delete('/:id', auth, role(['admin']), enrollCtrl.cancelEnrollment);

module.exports = router;
