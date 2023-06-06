import Comment from "@/models/Comment";
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

    const session = await getSession({ req })

    if (session?.user.name !== "admin") {
        return res.status(401).json({ status: "failed", message: "You are not an admin!" })
    }

    const { commentid } = req.query




    if (method === "DELETE") {
        const comment = await Comment.deleteOne({ _id: commentid })

        return res.status(200).json({ status: "success", message: 'comment is deleted!' })
    } else if (method === "PATCH") {
        const { type } = req.query;
        console.log(type)
        const comment = await Comment.findOne({ _id: commentid })
        if (type === "accepted") {
            comment.accepted = true
            comment.save()
            return res.status(200).json({ status: "success", message: "comment is accepted true" })
        } else if (type === "edit") {
            const { answer } = req.body
            console.log(answer)
            comment.answer = answer
            comment.save()
            return res.status(200).json({ status: "success", message: "comment is answred" })
        }

    }


}


export default handler