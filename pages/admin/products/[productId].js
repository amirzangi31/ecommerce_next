import EditProductAdmin from '@/components/templates/admin/EditProductAdmin'
import Category from '@/models/Category';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'

function EditProduct({ product, categories }) {

    return (
        <EditProductAdmin product={product} categories={categories} />
    )
}

export default EditProduct;




export async function getServerSideProps({ query }) {
    await connectDB()
    const { productId } = query
    const product = await Product.findOne({ _id: productId }).populate("category")
    const categories = await Category.find()


    return {
        props: { product: JSON.parse(JSON.stringify(product)), categories: JSON.parse(JSON.stringify(categories)) }
    }
}
