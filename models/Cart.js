
import mongoose, { Schema, models, model } from "mongoose";


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }

    ],

    totalPrice: {
        type: Number,
    },

    step: {
        type: String,
        default: "در حال پردازش"
    },

    confirmAdmin: {
        type: Boolean,
        default: false
    },

    dateConfirmAdmin: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },

    isPaid: {
        type: Boolean,
        default: false
    },
    datePaid: {
        type: Date
    },
    cancel: {
        type: Boolean
    },
    total: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
}
)


const Cart = models.Cart || model("Cart", cartSchema)

export default Cart






