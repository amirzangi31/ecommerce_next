import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {

    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "error to connecting to db!" });
    }
    const { method } = req

    const { query } = req


    if (method === 'POST') {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }

        const { name, description, price, category , brand , shortDes , properties } = req.body
        


        const product = await Product.findOne({ name })
        if (product) {
            return res.status(422).json({ status: 'failed', message: "Product is doesn't exist" })
        }

        if (!name || !description || !price || !brand || !shortDes) {
            return res.status(422).json({ status: "failed", message: 'Invalid data!' })
        }

        const newProduct = await Product.create({ ...req.body })

        return res.status(201).json({ status: "success", message: 'محصول با موفقیت اضافه شد', data: newProduct })
    } else if (method === "GET") {

        if (query.category) {
            const products = await Product.find({ category: query.category }).sort({ createdAt: -1 })
            
            return res.status(200).json({ status: "success", data: products })
        }


        const products = await Product.find()
        return res.status(200).json({ status: "success", data: products });
    }
}

export default handler