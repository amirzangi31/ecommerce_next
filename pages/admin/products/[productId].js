import EditProductAdmin from '@/components/templates/admin/EditProductAdmin'
import Category from '@/models/Category';
import Product from '@/models/Product';
import React from 'react'

function EditProduct({ product, categories }) {

    return (
        <EditProductAdmin product={product} categories={categories} />
    )
}

export default EditProduct;




export async function getServerSideProps({ query }) {
    const { productId } = query
    const product = await Product.findOne({ _id: productId })
    const categories = await Category.find().populate("parent")


    return {
        props: { product: JSON.parse(JSON.stringify(product)), categories: JSON.parse(JSON.stringify(categories)) }
    }
}
