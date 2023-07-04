import AddProductAdmin from '@/components/templates/admin/AddProductAdmin'
import Category from '@/models/Category';
import connectDB from '@/utils/connectDB';
import React from 'react'

function AddProduct({ categories }) {
    return (
        <AddProductAdmin categories={categories} />
    )
}

export default AddProduct;



export async function getServerSideProps() {
    await connectDB()

    const categories = await Category.find()


    return {
        props: { categories: JSON.parse(JSON.stringify(categories)) }
    }
}
