import CommntesProductPageAdmin from '@/components/templates/admin/CommntesProductPage'
import Comment from '@/models/Comment';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'

function CommentsProductAdmin({product}) {

  return (
    <CommntesProductPageAdmin product={product} />
  )
}

export default CommentsProductAdmin;




export async function getServerSideProps(context) {
  await connectDB();

  const { params } = context;
  const comments = await Comment.find();
  const product = await Product.findOne({ _id: params.productid }).populate("comments");


  return {
    props: {
      product : JSON.parse(JSON.stringify(product))
    }
  }
}