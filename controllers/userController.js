// controllers/userController.js

const { User, Thought } = require("../models");

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((dbUserData) =>
                dbUserData
                    ? res.json(dbUserData)
                    : res
                          .status(404)
                          .json({ message: "No user found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Update a user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) =>
                dbUserData
                    ? res.json(dbUserData)
                    : res
                          .status(404)
                          .json({ message: "No user found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user by ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) =>
                dbUserData
                    ? Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
                    : res
                          .status(404)
                          .json({ message: "No user found with this ID!" })
            )
            .then(() =>
                res.json({ message: "User and associated thoughts deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .select("-__v")
            .then((dbUserData) =>
                dbUserData
                    ? res.json(dbUserData)
                    : res
                          .status(404)
                          .json({ message: "No user found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove a friend from a user's friend list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .select("-__v")
            .then((dbUserData) =>
                dbUserData
                    ? res.json(dbUserData)
                    : res
                          .status(404)
                          .json({ message: "No user found with this ID!" })
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;
