
import mongoose, { Schema, models, model } from "mongoose";


const ticketSchema = new Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    text: {
        type: String,
        default: ""
    },

    answer: {
        type: String,
        default: ""
    },

    status: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
}, {
        timestamps: true
})


const Ticket = models.Ticket || model("Ticket", ticketSchema)

export default Ticket






