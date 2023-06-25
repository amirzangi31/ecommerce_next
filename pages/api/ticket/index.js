import Ticket from "@/models/Ticket";
import User from "@/models/User";
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

    if (!session) {
        return res.status(401).json({ status: "failed", message: "لطفا داخل سایت ورود کنید" })
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
        return res.status(404).json({ status: 'failed', message: "کاربر مورد نظر یافت نشد" })
    }



    if (method === "POST") {

        const { text } = req.body


        if (!text.trim()) {
            return res.status(422).json({ status: "failed", message: "Invalid data!" })
        }

        const ticket = await Ticket.create({ user: user._id, text })

        return res.status(200).json({ status: "success", data: ticket })
    } else if (method === "PATCH") {
        const { id } = req.query
        const { answer } = req.body
        const ticket = await Ticket.findOne({ _id: id })



        if (!answer.trim()) {
            return res.status(422).json({ status: "failed", message: "Invalid data!" })
        }


        ticket.answer = answer
        ticket.status = true
        ticket.updatedAt = Date.now()
        ticket.save()


        return res.status(200).json({ status: "success", message: "عملیات با موفقیت انجام شد", data: ticket })
    }

}


export default handler