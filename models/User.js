import { Schema, models, model } from "mongoose";

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
    orders: [{
        isaccepted: {
            type: Boolean,
            default: false
        },
        step: {
            type: Number,
            default: 0
        },
        totalprice: {
            type: Number,
        },
        products: [{ type: Object }],
        createdAt: {
            type: Date,
            default: () => Date.now()
        },
        timeaccept: {
            type: Date,
        }
    }],
    role: {
        type: String,
        default: "user"
    },
    phone: String,
    postalcode: String,
})

const User = models.User || model("User", userSchema)

export default User;



