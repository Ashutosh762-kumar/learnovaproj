// quiz routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const quizCtrl = require('../controllers/quizController');

router.post('/', auth, role(['teacher','admin']), quizCtrl.createQuiz);
router.post('/question', auth, role(['teacher','admin']), quizCtrl.addQuestion);
router.post('/submit', auth, quizCtrl.takeQuiz);

module.exports = router;
