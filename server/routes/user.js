const express = require('express');
const router = express.Router();

// user
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.post('/user/create', authMiddleware.verifyToken, userController.create);

// export
module.exports = router;
