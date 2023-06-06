import HomePage from "@/components/templates/home/HomePage";
import Article from "@/models/Article";
import Category from "@/models/Category";
import Product from "@/models/Product";
import connectDB from "@/utils/connectDB";

export default function Home({ articles ,products}) {

  
  return (
    <HomePage products={products}  articles={articles}  />
  );
}





export async function getStaticProps() {
  await connectDB()
  const category = await Category.find()
  const products = await Product.find({}, null, { sort: { "_id": -1 }, limit: 6 }).populate("category")
  const articles = await Article.find({}, null, { sort: { "_id": -1 }, limit: 6 })

  

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      articles: JSON.parse(JSON.stringify(articles))
    }
  }
} 