import Article from "@/models/Article";
import Comment from "@/models/Comment";
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

    const { method } = req;

    if (method === "POST") {
        const { name, email, comment, typecomment, parent } = req.body

        if (!name || !email || !comment || !typecomment || !parent) {
            return res.status(422).json({ status: "failed", message: "Invalid Data!" })
        }

        if (typecomment === "article") {
            const article = await Article.findOne({ _id: parent })
            if (!article) {
                res.status(422).json({ status: "success", message: "Invalid Data" })
            }
            const newComment = await Comment.create({ ...req.body, article: parent })

            article.comments = newComment._id
            article.save()
            return res.status(201).json({ status: "success", data: article })

        } else if (typecomment === "product") {
            const product = await Product.findOne({ _id: parent })
            if (!product) {
                res.status(422).json({ status: "success", message: "Invalid Data" })
            }
            const newComment = await Comment.create({ ...req.body, product: parent })
            product.comments = newComment._id
            product.save()
            return res.status(201).json({ status: "success", data: product })

        }





    } else if (method === 'DELETE') {
        const comment = await Comment.deleteOne({ _id: "647ef3fc2f7dffb7e1f864ac" })
        res.status(200).json({ status: "success" })

    } else if (method === 'GET') {

        const session = await getSession({ req })
        if (session?.user.name !== "admin") {
            return res.status(401).json({ status: "failed ", message: "You are not an admin" })
        }

        const comments = await Comment.find()
        res.status(200).json({ status: "success", data: comments })
    }
}


export default handler