
import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";

const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "error to connecting to db!" });
    }

    const { page = 1, limit = 10 } = req.query

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { createdAt: -1 }
    }
    const products = await Product.paginate({}, options)
    return res.status(200).json({ status: "success", data: products })
}

export default handler;