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
    const { id } = req.query
    const article = await Article.findOne({ _id: id })


    if (method === 'PATCH') {
        const session = await getSession({ req })
        if (!session || session.user.name !== "admin") {
            return res.status(401).json({ status: "failed", message: "You are not logged in!" })
        }

        const { title, description, author, image, shortdes } = req.body

        if (!title || !description || !author || !image || !shortdes) {
            return res.status(422).json({ status: "failed", message: 'Invalid data!' })
        }

        article.title = title || article.title;
        article.description = description || article.description;
        article.image = image || article.image;
        article.author = author || article.author;
        article.shortdes = shortdes || article.shortdes;
        article.updatedAt = Date.now()
        article.save()



        return res.status(200).json({ status: "success", message: 'Article updated', data: article })
    } else if (method === 'GET') {



        return res.status(200).json({ status: "success", data: article })

    } else if (method === "DELETE") {
        const articleDelete = await Article.deleteOne({ _id: id })
        return res.status(200).json({ status: "success", message: "Article is deleted" })
    }
}

export default handler