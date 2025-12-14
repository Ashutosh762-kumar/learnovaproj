// user routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const userCtrl = require('../controllers/userController');

router.get('/me', auth, userCtrl.getProfile);
router.put('/me', auth, userCtrl.updateProfile);
router.post('/me/change-password', auth, userCtrl.changePassword);

// admin routes
router.get('/', auth, role(['admin']), userCtrl.listUsers);
router.delete('/:id', auth, role(['admin']), userCtrl.deleteUser);

module.exports = router;
