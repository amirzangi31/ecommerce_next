import mongoose, { Schema, models, model } from "mongoose"



const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortdes: {
        type: String,
        required: true,
    },

    author: { type: mongoose.Types.ObjectId, ref: "User" },
    image: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }]
})



const Article = models.Article || model("Article", articleSchema)

export default Article



