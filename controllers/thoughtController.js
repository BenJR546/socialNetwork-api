// controllers/thoughtController.js

const { Thought, User } = require("../models");

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select("-__v")
            .then((dbThoughtData) =>
                dbThoughtData
                    ? res.json(dbThoughtData)
                    : res
                          .status(404)
                          .json({ message: "No thought found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) =>
                User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            )
            .then((dbUserData) =>
                dbUserData
                    ? res.json({ message: "Thought created!" })
                    : res
                          .status(404)
                          .json({
                              message: "No user found with this username!",
                          })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Update a thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .select("-__v")
            .then((dbThoughtData) =>
                dbThoughtData
                    ? res.json(dbThoughtData)
                    : res
                          .status(404)
                          .json({ message: "No thought found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) =>
                dbThoughtData
                    ? res.json({ message: "Thought deleted!" })
                    : res
                          .status(404)
                          .json({ message: "No thought found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .select("-__v")
            .then((dbThoughtData) =>
                dbThoughtData
                    ? res.json(dbThoughtData)
                    : res
                          .status(404)
                          .json({ message: "No thought found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction from a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .select("-__v")
            .then((dbThoughtData) =>
                dbThoughtData
                    ? res.json(dbThoughtData)
                    : res
                          .status(404)
                          .json({ message: "No thought found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;
