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

    const session = await getSession({ req })
    console.log(session)
    if (!session) {
        return res.status(401).json({ status: "failed", message: "You are not logged in" })
    }


    const user = await User.findOne({ email: session.user.email })
    
    const { name, email, profileimage, orders, createdAt, updatedAt, address, phone , _id } = user

    console.log(await User.find())


    if (req.method === "GET") {
        return res.status(200).json({ status: "success", user: { _id , name, email, profileimage, orders, createdAt, updatedAt, address, phone } })
    }

}


export default handler