import mongoose, { Schema, models, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brands: [
        {
            type: Object
        }
    ],
    image: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

const Category = models.Category || model("Category", categorySchema)


export default Category



