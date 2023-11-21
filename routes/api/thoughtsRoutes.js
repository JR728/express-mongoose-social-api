//routes/api/thoughtsRoutes.js
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Define routes
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete((req, res) => deleteThought(req, res));

router.route('/:thoughtId/reactions')
  .post(createReaction)

router.route('/:thoughtId/reactions/:id')
  .delete(deleteReaction);

module.exports = router;
