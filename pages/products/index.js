import ProductsPage from '@/components/templates/products/ProductsPage'
import Category from '@/models/Category';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';
import React from 'react'



function Products({ products }) {

  return (
    <ProductsPage products={products.docs} pageCount={products.totalPages} page={products.page - 1} />
  )
}

export default Products;




export async function getServerSideProps(context) {
  await connectDB()
  const category = await Category.find()

  const { page = 1, limit = 8 } = context.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 },
    populate: {
      path: 'category',
      select: '_id name',
    },
  }

  const products = await Product.paginate({}, options)

  


  if (products.totalPages < +page) {
    return {
      notFound: true
    }
  }


  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }

  }

}

