import ProductsadminPage from '@/components/templates/admin/ProductsadminPage'
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'

function ProductsAdmin({ products }) {

  return (
    <ProductsadminPage products={products} />
  )
}

export default ProductsAdmin;




export async function getServerSideProps() {
  await connectDB();
  const products = await Product.find()

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}

