
const express = require('express');
const { deleteUserById, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/admin-middleware');
const router = express.Router();

router.get('/', protect, verifyAdmin, getUsers);
router.delete('/:userId', protect, verifyAdmin, deleteUserById);

module.exports = router;