import Article from "@/models/Article";
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";
import { ResolvedPos } from "@tiptap/pm/model";
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

    const session = await getSession({ req })

    if (session?.user.name !== "admin") {
        return res.status(401).json({ status: "failed", message: "You are not an admin!" })
    }
    const { commentid } = req.query
    if (method === "DELETE") {
        const { parent } = req.query;

        const comment = await Comment.findOne({ _id: commentid })

        if (!comment) {
            return res.status(404).json({ status: "failed", message: "comment is not found" })
        }

        if (comment.typecomment === "product") {
            const prodcut = await Product.findOne({ _id: comment.product })
            prodcut.comments.pull(commentid)
            prodcut.save()
        } else if (comment.typecomment === "article") {
            const article = await Article.findOne({ _id: comment.article })
            article.comments.pull(commentid)
            article.save()
        }
        const commentD = await Comment.deleteOne({ _id: commentid })
        return res.status(200).json({ status: "success", message: 'comment is deleted!' })

    } else if (method === "PATCH") {
        const { type } = req.query;
        const comment = await Comment.findOne({ _id: commentid })
        if (type === "accepted") {
            comment.accepted = !comment.accepted
            comment.save()
            return res.status(200).json({ status: "success", message: "comment is change accepted " })
        } else if (type === "edit") {
            const { answer } = req.body
            if (answer.trim() === "") {
                return res.status(422).json({ status: "failed", message: "Invalid data" })
            }
            comment.answer = answer
            comment.save()
            return res.status(200).json({ status: "success", message: "comment is answred" })
        }
    }
}


export default handler;