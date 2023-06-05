import HomePage from "@/components/templates/home/HomePage";
import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";

export default function Home({ products }) {

  console.log(products)
  return (
    <HomePage products={products} />
  );
}





export async function getStaticProps() {
  await connectDB()
  const products = await Product.find({}, null, { sort: { "_id": -1 }, limit: 6 }).populate("category")

  

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}