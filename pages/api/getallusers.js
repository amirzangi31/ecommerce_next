import User from "@/models/User";
import connectDB from "@/utils/connectDB";

const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "error to connecting to db!" });
    }


    const users = await User.find().sort({ createdAt: -1 })


    res.status(200).json({ status: "success", users })


}



export default handler