// quiz logic
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const { success, error } = require('../utils/response');

exports.createQuiz = async (req,res) => {
  const { courseId, title, totalMarks, durationMinutes } = req.body;
  const quiz = await Quiz.create({ course: courseId, title, totalMarks, durationMinutes });
  return success(res, { quiz }, 'Quiz created', 201);
};

exports.addQuestion = async (req,res) => {
  const { quizId, text, options, answerIndex } = req.body;
  const question = await Question.create({ quiz: quizId, text, options, answerIndex });
  return success(res, { question }, 'Question added', 201);
};

exports.takeQuiz = async (req,res) => {
  // expects answers: [{ questionId, answerIndex }, ...]
  const { answers } = req.body;
  if (!Array.isArray(answers)) return error(res, 'Answers array required', 400);
  let score = 0;
  for (const a of answers) {
    const q = await Question.findById(a.questionId);
    if (!q) continue;
    if (q.answerIndex === a.answerIndex) score++;
  }
  return success(res, { score }, 'Quiz submitted');
};
