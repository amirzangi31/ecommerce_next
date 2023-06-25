import Cart from "@/models/Cart";
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


    if (req.method === "PATCH") {

        const { cartId } = req.body
        const { status } = req.query



        const cart = await Cart.findOne({ _id: cartId })

        if (!cart) {
            return res.status(404).json({ status: "failed", message: "سبد خرید مورد نظر یافت نشد" })
        }

        if (status === "true") {
            cart.step = "سفارشات شما تحویل پست داده شد"
            cart.confirmAdmin = true
            cart.dateConfirmAdmin = Date.now()

            cart.save()

            return res.status(200).json({ status: "success", message: "عملیات باموفقیت انجام شد", data: cart })

        } else if (status === "false") {
            cart.step = "سفارشات شما توسط ادمین لغو شد برای بازگشت وجه باشما تماس گرفته میشود"
            cart.confirmAdmin = true
            cart.cancel = true
            cart.dateConfirmAdmin = Date.now()


            cart.save()
            return res.status(200).json({ status: "success", message: "عملیات باموفقیت انجام شد", data: cart })
        }



    }




}


export default handler