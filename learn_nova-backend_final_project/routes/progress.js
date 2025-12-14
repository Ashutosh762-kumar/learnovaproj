// progress routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const progressCtrl = require('../controllers/progressController');

router.post('/watch', auth, progressCtrl.markVideoWatched);
router.get('/', auth, progressCtrl.getProgress);

module.exports = router;
