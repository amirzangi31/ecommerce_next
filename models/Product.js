import mongoose, { Schema, models, model } from "mongoose"


import mongoosePaginate from 'mongoose-paginate-v2'


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{ name: String, link: String }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    properties: { type: Object },
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
}, {
    timestamps: true
})

ProductSchema.plugin(mongoosePaginate)

const Product = models.Product || model("Product", ProductSchema)

export default Product



