import Request from "@/models/Request";
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

    const { requestId } = req.query

    const session = await getSession({ req })
    if (!session || session.user.name !== "admin") {
        return res.status(422).json({ status: "failed", message: "شما ادمین نیستید و مجاز با این کار نمیباشید" })
    }

    const request = await Request.findOne({ _id: requestId })
    if (!request) {
        return res.status(404).json({ status: "failed", message: "درخواست مورد نظر یافت نشد" })
    }

    if (req.method === "PATCH") {

        request.confirmAdmin = true
        request.updatedAt = Date.now()
        request.save()

        return res.status(200).json({ status: "success", message: "عملیات با موفقیت انجام شد" , data : request })
    }




}

export default handler