// const router = require('express').Router();
// const {register, login} = require ('../controllers/auth.controllers.js');
// const authMiddleware = require("../middleware/authMiddleware");



// router.post('/register', register);
// router.post('/login', login);


// router.get('/me', authMiddleware, (req, res) => {
//   res.json(req.user); // send user info extracted by authMiddleware
// });



// module.exports = router;



// // const router = require('express').Router();
// // const { register, login } = require('../controllers/auth.controllers.js');
// // const authenticateToken = require('../middleware/auth.middleware.js'); // your JWT auth middleware

// // router.post('/register', register);
// // router.post('/login', login);

// // // Add this GET route to return logged-in user info
// // router.get('/me', authenticateToken, (req, res) => {
// //   // req.user is set by authenticateToken middleware after verifying JWT
// //   res.json(req.user);
// // });

// // module.exports = router;






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
