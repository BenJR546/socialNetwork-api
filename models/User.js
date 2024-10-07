// models/User.js

const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required.",
            trim: true,
        },
        email: {
            type: String,
            required: "Email is required.",
            unique: true,
            match: [/.+@.+\..+/, "Must be a valid email address."],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to get the length of the user's friends array
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
