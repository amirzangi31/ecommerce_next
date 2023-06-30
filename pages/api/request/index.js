import Request from "@/models/Request";
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
        const { requestText } = req.body
        const { type } = req.query

        
        if (!requestText || !type ) {
            return res.status(422).json({ status: "failed", message: "invalid Data!" })
        }




        const request = await Request.create({ user: user._id, type, requestText })

        console.log(request)


        return res.status(201).json({status :"success" , message : "درخواست با موفقیت ارسال شد" })
    }








}

export default handler