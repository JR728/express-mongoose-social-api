//controller/thoughtController.js
const { Thought, User , reactionSchema } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(500).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  createThought({ body }, res) { 
    let thoughtData; // Declare thoughtData variable
    Thought.create(body)
      .then(createdThought => {
        thoughtData = createdThought;  // Assign createdThought to thoughtData
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(thoughtData);  // Send the correct thoughtData in the response
      })
      .catch(err => res.status(500).json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  deleteThought: (req, res) => {
    let deletedThought;

    Thought.findOneAndDelete({ _id: req.params.id })
      .then(thoughtData => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }

        deletedThought = thoughtData;

        // Send a success message for thought deletion
        res.json({ message: 'Thought deleted successfully', deletedThought });
      })
      .catch(err => {
        console.error('Error deleting thought:', err);
        res.status(500).json({ message: 'Error deleting thought' });
      });
  },


  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.id } } },
      { new: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },
};

module.exports = thoughtController;
