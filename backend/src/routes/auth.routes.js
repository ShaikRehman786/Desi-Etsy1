

const router = require('express').Router();
const { register, login } = require('../controllers/auth.controllers.js');
const { protect } = require('../middlewares/auth.middleware.js');

// Existing auth routes
router.post('/register', register);
router.post('/login', login);

// New route to get current user info using token
router.get('/me', protect, (req, res) => {
  res.json(req.user); // send back the user object attached by middleware
});

module.exports = router;
