import ProductsPage from '@/components/templates/products/ProductsPage'
import Category from '@/models/Category';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';
import React from 'react'

function Products({ products }) {

  return (
    <ProductsPage products={products} />
  )
}

export default Products;


export async function getStaticProps() {

  await connectDB()
  const category = await Category.find()
  const products = await Product.find().populate("category")


  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 30
  }
}