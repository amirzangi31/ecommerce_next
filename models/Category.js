import mongoose, { Schema, models, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    properties: [{ type: Object }],
    image: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

const Category = models.Category || model("Category", categorySchema)


export default Category



