import CategoriesPageAdmin from '@/components/templates/admin/CategoriesPageAdmin'
import Category from '@/models/Category';
import React from 'react'

function Categories({ categories }) {
  
  return (
    <CategoriesPageAdmin categories={categories} />
  )
}

export default Categories;




export async function getServerSideProps({ req }) {

  const categories = await Category.find().populate("parent")

  

  return {
    props: { categories: JSON.parse(JSON.stringify(categories)) }
  }


}