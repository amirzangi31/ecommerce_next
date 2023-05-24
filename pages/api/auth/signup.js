import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "Error to connecting to db!" });
    }

    const { email, password } = req.body

    //----------------------------confirm get as req body----------------------------//
    // |||
    // |||
    // |||
    // |||
    //----------------------------confirm get as req body----------------------------//


    const role = "user";

    if (!email || !password || password !== confirmPassword) {
        return res.status(401).json({ status: "failed", message: "Invalid Data!" })
    }

    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return res.status(401).json({ status: "failed", message: "user doesn't exist!" })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({ email, password: hashedPassword, role })

    return res.status(201).json({ status: "success", data: user })
}


export default handler