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

    const session = await getSession({ req })
    if (!session) {
        return res.status(422).json({ status: "failed", message: "ابتدا در سایت ورود کنید" })
    }


    if (session.user.name !== "admin") {
        return res.status(422).json({ status: "failed", message: "شما ادمین نیستید و مجاز به انجام عملیات نمیباشید" })
    }



    res.json({})
}


export default handler