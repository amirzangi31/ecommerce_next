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

    const { email, password , confirmpassword} = req.body

    if (!email.trim() || !password.trim() || password.length < 8 || password !== confirmpassword) {
        return res.status(422).json({ status: "failed", message: "Invalid data!" })
    }


    const role = "user";


    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return res.status(401).json({ status: "failed", message: "user doesn't exist!" })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({ email, password: hashedPassword, role })

    return res.status(201).json({ status: "success", data: user })
}


export default handler