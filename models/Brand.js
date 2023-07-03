import mongoose, { Schema, models, model } from "mongoose"

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

const Brand = models.Brand || model("Brand", brandSchema)


export default Brand



