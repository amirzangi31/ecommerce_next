
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";


const calculateTotalPriceAndTotal = async (cartId) => {

    let cart = await Cart.findOne({ _id: cartId }).populate("items.product")
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const total = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    cart.totalPrice = totalPrice
    cart.total = total
    cart = await cart.save()
    return cart
}



const addToCart = async (productId, quantity, userId) => {



    const product = await Product.findOne({ _id: productId })
    if (!product) {
        return res.status(404).json({ status: "failed", message: "محصول مورد نظر یافت نشد" })
    }

    //find not paid shopping cart for user 
    let cart = await Cart.findOne({ user: userId, isPaid: false })

    //if cart is notfond create cart for user
    if (!cart) {
        cart = new Cart({
            user: userId
        })
    }


    //find product in shoppingcart
    let itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);


    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
    } else {
        cart.items.push({ product: product, quantity: quantity })
    }



    cart = await cart.save()

    return cart
}




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


    if (req.method === "POST") {
        const { productId } = req.body
        const { quantity = 1 } = req.body

        const product = await Product.findOne({ _id: productId })
        if (!product) {
            return res.status(404).json({ status: "failed", message: "محصول مورد نظر یافت نشد" })
        }

        try {
            const add = await addToCart(productId, quantity, user._id)
            const result = await calculateTotalPriceAndTotal(add._id)
            return res.status(200).json({
                status: "success",
                data: result,
                message: `محصول مورد نظر با موفقیت به سبد خرید اضافه شد`
            })
        } catch (error) {
            console.log(error)
        }
    } else if (req.method === "GET") {

        const { type } = req.query




        const carts = await Cart.find({ user: user._id }).populate("items.product")









        if (type === "noPaid") {
            const noPaid = carts.filter(item => item.isPaid === false)
            if (!noPaid.length) {
                const newCart = await Cart.create({ user: user._id })
                return res.status(201).json({ status: "success", data: newCart })
            } else {
                const result = await calculateTotalPriceAndTotal(noPaid[0]._id)
                //get noPaid shopping cart
                return res.status(200).json({ status: "success", data: result })
            }

        } else {

            const noPaid = carts.filter(item => item.isPaid === false)
            const isPaid = carts.filter(item => item.isPaid === true)

            if (!noPaid.length) {

                return res.status(200).json({ status: "success", data: isPaid })
            } else {

                const result = await calculateTotalPriceAndTotal(noPaid[0]._id)
                return res.status(200).json({ status: "success", data: [...isPaid, result] })
            }

        }


    }


}


export default handler







