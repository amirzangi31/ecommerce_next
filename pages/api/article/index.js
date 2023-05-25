import Article from "@/models/Article";
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



    if (method === 'POST') {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }

        const { title, description, author, image, shortdes } = req.body



        const article = await Article.findOne({ title })
        if (article) {
            return res.status(422).json({ status: 'failed', message: "Article is doesn't exist" })
        }

        if (!title || !description || !author || !image || !shortdes) {
            return res.status(422).json({ status: "failed", message: 'Invalid data!' })
        }

        const newArticle = await Article.create({ ...req.body })

        return res.status(201).json({ status: "success", message: 'Article created', data: newArticle })
    } else if (method === 'GET') {
        const articles = await Article.find()


        return res.status(200).json({ status: "success", data: articles })

    }
}

export default handler