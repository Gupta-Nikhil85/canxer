const express = require('express');
const { register, login, forgotPassword, resetPassword,getUsers,getUser, updateUser, deleteUser, getCurrentUser } = require('../controllers/authController');
const checkOrgAdminMiddleware = require('../middleware/checkOrgAdminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', checkOrgAdminMiddleware, register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.get("/user/all",checkOrgAdminMiddleware, getUsers);
router.get("/user/:userId",checkOrgAdminMiddleware, getUser);
router.put("/user/:userId",checkOrgAdminMiddleware, updateUser);
router.delete("/user/:userId",checkOrgAdminMiddleware, deleteUser);
router.get("/user-current",authMiddleware, getCurrentUser);

module.exports = router;
