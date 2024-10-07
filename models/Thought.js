// models/Thought.js

const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// Reaction Schema (Subdocument)
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "Reaction body is required.",
            maxlength: 280,
        },
        username: {
            type: String,
            required: "Username is required.",
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) =>
                moment(timestamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Thought Schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought text is required.",
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) =>
                moment(timestamp).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: "Username is required.",
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual to get the length of the thought's reactions array
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
