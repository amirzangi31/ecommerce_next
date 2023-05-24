import AddProductAdmin from '@/components/templates/admin/AddProductAdmin'
import Category from '@/models/Category';
import React from 'react'

function AddProduct({ categories }) {
    return (
        <AddProductAdmin categories={categories} />
    )
}

export default AddProduct;



export async function getServerSideProps() {
    const categories = await Category.find().populate("parent")


    return {
        props: { categories: JSON.parse(JSON.stringify(categories)) }
    }
}
