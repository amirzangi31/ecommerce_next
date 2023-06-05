import ProductsPage from '@/components/templates/products/ProductsPage'
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





export async function getServerSideProps() {
  
  await connectDB()
  const products = await Product.find({}, null, { sort: { "_id": -1 }, limit: 5 })
  
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}