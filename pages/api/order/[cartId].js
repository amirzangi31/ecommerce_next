import Cart from "@/models/Cart";
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

    if (!session) {
        return res.status(401).json({ status: "failed", message: "لطفا داخل سایت ورود کنید" })
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
        return res.status(404).json({ status: 'failed', message: "کاربر مورد نظر یافت نشد" })
    }

    if (req.method === "PATCH") {
        const { type, cartId, product } = req.query



        if (type === "increase") {
            Cart.findOneAndUpdate({
                _id: cartId,
                "items.product": product
            },
                { $inc: { 'items.$.quantity': 1 } },
                { new: true }
            ).populate("items.product").then(cart => {
                return res.status(200).json({ status: "success" })
            }).catch(err => {
                console.log(err)
            })
        } else if (type === "decrease") {
            Cart.findOneAndUpdate({
                _id: cartId,
                "items.product": product
            },
                { $inc: { 'items.$.quantity': -1 } },
                { new: true }
            ).populate("items.product").then(cart => {
                return res.status(200).json({ status: "success" })
            }).catch(err => {
                console.log(err)
            })

        } else if (type === "delete") {
            const cart = await Cart.findByIdAndUpdate(cartId, {
                $pull: { items: { product: product } },
            }, { new: true })


            return res.status(200).json({ status: "success" })

        } else if (type === "payment") {
            console.log("first")
            const cart = await Cart.findOne({ _id: cartId })
            
            if (!cart) {
                return res.status(404).json({ status: "failed ", message: "سبد خرید مورد نیاز یافت نشد!" })
            }

            cart.isPaid = true
            cart.datePaid =  Date.now()
            cart.save()
            return res.status(200).json({ status: "success", message: "سبد خرید با موفقیت پرداخت شد", data: cart })
        }

    }
}


export default handler