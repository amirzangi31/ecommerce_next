import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {

    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "Error to connecting to db!" });
    }
    const { method } = req

    const { id } = req.query

    if (method === "DELETE") {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }
        const product = await Product.deleteOne({ _id: id })

        return res.status(200).json({ status: "success", message: "Product is deleted" })
    } else if (method === "PATCH") {
        const { name, price, images, description, category , properties } = req.body;
        const product = await Product.findOne({ _id: id })


        if (name.trim() === "" || description.trim() === "" || !price) {
            return res.status(422).json({ status: "failed", message: "Invalid data!" })
        }

        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.images = images || product.images
        product.properties = properties || product.properties
        product.category = category || product.category || undefined
        product.updatedAt = Date.now()
        product.save()
        return res.status(200).json({ status: "success", data: product, message: "Product is updated" })
    }
}

export default handler