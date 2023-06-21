import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileimage: {
        type: String
    },
    address: {
        type: String
    },

    role: {
        type: String,
        default: "user"
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    phone: String,
    postalcode: String,
})

const User = models.User || model("User", userSchema)

export default User;





