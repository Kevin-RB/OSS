
const express = require('express');
const { deleteUserById, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { verifyRole } = require('../middleware/role-middleware');
const router = express.Router();

router.get('/', protect, verifyRole(['admin']), getUsers);
router.delete('/:userId', protect, verifyRole(['admin']), deleteUserById);

module.exports = router;