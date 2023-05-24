import Category from "@/models/Category";
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



    if (method === 'POST') {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }

        const { name, properties, parent , image } = req.body
        const category = await Category.findOne({ name })
        if (category) {
            return res.status(422).json({ status: 'failed', message: "Category is doesn't exist" })
        }

        if (!name) {
            return res.status(422).json({ status: "failed", message: 'Invalid data!' })
        }

        const newCategory = await Category.create({ name, parent: parent.toString() || undefined, properties , image })

        return res.status(201).json({ status: "success", message: 'Category created', data: newCategory })
    } else if (method === 'GET') {
        const categories = await Category.find()

        return res.status(200).json({ status: 'success', data: categories })
    }
}

export default handler