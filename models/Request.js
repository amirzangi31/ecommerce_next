import mongoose, { Schema, models, model } from "mongoose"

const requestSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    requestText: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },

    confirmAdmin: {
        type: Boolean,
        default: false
    },

    type: {
        type: String,
        enum: ["counseling", "sale", "repire"]
    }
})



const Request = models.Request || model("Request", requestSchema)

export default Request



