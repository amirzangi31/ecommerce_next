import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "error to connecting to db!" });
    }


    const hashedPassword = await hashPassword("03413642127")

    const userData = {
        email: "zangiabadi1378888@gmail.com",
        password: hashedPassword,
        role: "admin",
        name: "admin_1"
    }


    const user = await User.create({ ...userData })

    return res.status(201).json({ status: "success", data: user })
}

export default handler;