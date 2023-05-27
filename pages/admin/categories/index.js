import CategoriesPageAdmin from '@/components/templates/admin/CategoriesPageAdmin'
import Category from '@/models/Category';
import connectDB from '@/utils/connectDB';
import React from 'react'

function Categories({ categories }) {
  
  return (
    <CategoriesPageAdmin categories={categories} />
  )
}

export default Categories;




export async function getServerSideProps({ req }) {
  await connectDB()

  const categories = await Category.find().populate("parent")

  

  return {
    props: { categories: JSON.parse(JSON.stringify(categories)) }
  }


}