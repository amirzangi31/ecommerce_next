import ProductsadminPage from '@/components/templates/admin/ProductsadminPage'
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'




function ProductsAdmin({ products }) {

  return (
    <ProductsadminPage products={products.docs} pageCount={products.totalPages} page={products.page - 1} />
  )
}

export default ProductsAdmin;




export async function getServerSideProps(context) {
  await connectDB();

  const { page = 1, limit = 10 } = context.query

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 }
  }


  const products = await Product.paginate({}, options)

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

