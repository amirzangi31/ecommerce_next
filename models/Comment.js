import mongoose, { Schema, models, model } from "mongoose"

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    typecomment: {
        type: String,
        enum: ["product", "article"],
        required: true,
        default: "product"
    },
    product : {
        type : mongoose.Types.ObjectId,
        ref : "Product"
    },
    article : {
        type : mongoose.Types.ObjectId,
        ref : "Article"
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    }
})

const Comment = models.Comment || model("Comment", commentSchema)


export default Comment



