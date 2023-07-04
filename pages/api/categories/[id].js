import Category from "@/models/Category";
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
    const { id } = req.query


    if (method === 'DELETE') {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }
        const category = await Category.deleteOne({ _id: id })
        return res.status(200).json({ status: 'success', message: 'Category is deleted' })
    } else if (method === "PATCH") {
        const { name, brands  , image } = req.body
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }

        if (name.trim() === "") {
            return res.status(422).json({ status: "failed", message: "Invalid data!" })
        }
        const category = await Category.findOne({ _id: id })
        category.name = name
        category.brands = brands
        category.image = image
        category.save()

        return res.status(200).json({ status: "success", message: "Category is updated", data: category })

    } else if (method === "GET") {
        const category = await Category.findOne({ _id: id }).populate("parent")
        return res.status(200).json({ status: 'success', data: category })
    }
}

export default handler