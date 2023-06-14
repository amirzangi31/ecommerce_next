import ProductPage from '@/components/templates/products/ProductPage'
import Category from '@/models/Category';
import Product from '@/models/Product';

import connectDB from '@/utils/connectDB';
import React from 'react'

function ProductP({ product }) {

  return (
    <ProductPage product={product} />
  )
}

export default ProductP;


export async function getStaticPaths() {
  await connectDB()
  const category = await Category.find()
  const products = await Product.find()
  const test = JSON.parse(JSON.stringify(products))


  const data = test.slice(0, 8)


  const paths = data.map(item => ({
    params: { productid: item._id.toString() }
  }))


  return {
    paths,
    fallback: "blocking"
  }
}



export async function getStaticProps(context) {
  const { params } = context;
  await connectDB()
  const categories = await Category.find()
  const id = params.productid

  const product = await Product.findOne({ _id: id }).populate("category")


  return {
    props: { product: JSON.parse(JSON.stringify(product)) }
  }
}