import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
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
        return res.status(401).json({ status: "failed", message: "You are not logged in" })
    }


    const user = await User.findOne({ email: session.user.email })




    if (req.method === "GET") {

        const { name, email, profileimage, orders, createdAt, updatedAt, address, postalcode, phone, _id, isComplete, card } = user

        

        return res.status(200).json({ status: "success", user: { _id, name, email, profileimage, postalcode, orders, card, createdAt, updatedAt, address, phone, isComplete } })
    }

    else if (req.method === "PATCH") {
        const { name, postalcode, profileimage, password, phone, address, card } = req.body

        const verifyP = await verifyPassword(password, user.password)

        if (!verifyP) {
            return res.status(422).json({ status: "failed", message: "Invalid data!" })
        }
        user.name = name 
        user.postalcode = postalcode 
        user.address = address 
        user.phone = phone 
        user.profileimage = profileimage 
        user.card = card 
        user.updatedAt = Date.now()

        

        if (!!user.name.trim() && !!user.phone.trim() && !!user.address.trim() && !!user.postalcode.trim() && !!user.card.trim()) {
            user.isComplete = true
        } else if (!user.name.trim() && !user.phone.trim() && !user.address.trim() && !user.postalcode.trim() && !user.card.trim()) {
            user.isComplete = false
        }

        user.save()

        return res.status(200).json({
            status: "success",
            message: "user is updated",
            data: {
                name: user.name,
                postalcode: user.postalcode,
                email: user.email,
                phone: user.phone,
                address: user.address,
                profileimage: user.profileimage,
                updatedAt: user.updatedAt,
                isComplete: user.isComplete,
                card: user.card
            }
        })
    }

}


export default handler