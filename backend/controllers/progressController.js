// progress logic
const Progress = require('../models/progress');
const Video = require('../models/video');
const { success, error } = require('../utils/response');

exports.markVideoWatched = async (req,res) => {
  const user = req.user.id;
  const { videoId, courseId } = req.body;
  let progress = await Progress.findOne({ user, course: courseId });
  if (!progress) {
    progress = new Progress({ user, course: courseId, watchedVideos: [] });
  }
  if (!progress.watchedVideos.includes(videoId)) progress.watchedVideos.push(videoId);
  await progress.save();
  return success(res, { progress }, 'Marked watched');
};

exports.getProgress = async (req,res) => {
  const user = req.user.id;
  const { courseId } = req.query;
  const progress = await Progress.findOne({ user, course: courseId }).populate('watchedVideos');
  return success(res, { progress }, 'Progress fetched');
};
