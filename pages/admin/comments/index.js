import CommentsAdminPage from '@/components/templates/admin/CommentsAdminPage'
import Article from '@/models/Article';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'
import useSWR from "swr";

function CommentsAdmin({ articles, products }) {

    const {data , error , isLoading} = useSWR("/api/products",
        (url) => fetch(url).then((res) => res.json())
    )

    console.log({data , error , isLoading} )

    return (
        <CommentsAdminPage articles={articles} products={products} />
    )
}

export default CommentsAdmin;



export async function getServerSideProps(context) {

    await connectDB()
    const products = await Product.find()
    const articles = await Article.find()


    return {
        props: {
            articles: JSON.parse(JSON.stringify(articles)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
}