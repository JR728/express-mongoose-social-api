//routes/index.js
const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const reactionRoutes = require('./api/reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/:thoughtId/reactions', thoughtRoutes); // Add this line for nested reactions route
router.use('/reactions', reactionRoutes);

router.use((req, res) => {
  return res.status(404).json({ message: 'Wrong route!' });
});

module.exports = router;
