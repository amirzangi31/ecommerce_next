import SearchPage from '@/components/templates/search/SearchPage'
import Category from '@/models/Category';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'

function Search({ products, categories }) {
  console.log(products)
  return (
    <SearchPage
      products={products.docs}
      pageCount={products.totalPages}
      page={products.page - 1}
      categories={categories}
    />
  )
}

export default Search;



export const getServerSideProps = async (context) => {

  await connectDB()

  let query = {}

  if (context.query.category) {
    query.category = context.query.category
  }

  if (context.query.name) {
    query.name = {
      $regex: context.query.name,
      $options: 'i'
    }
  }

  if (context.query.lowPrice && context.query.highPrice) {
    query.price = {
      $gte: context.query.lowPrice,
      $lte: context.query.highPrice
    }
  } else if (context.query.lowPrice) {
    query.price = {
      $gte: context.query.lowPrice
    }
  } else if (context.query.highPrice) {
    query.price = {
      $lte: context.query.highPrice
    }
  }


  const sort = {}

  if (context.query.sortBy) {
    if (context.query.sortBy === "price") {
      //ارزان ترین
      sort.price = 1
    } else if (context.query.sortBy === "-price") {
      //گرانترین
      sort.price = -1
    } else if (context.query.sortBy === "-lasted") {
      //جدیدترین
      sort.createdAt = -1
    } else if (context.query.sortBy === "lasted") {
      //قدیمی ترین
      sort.createdAt = 1
    }
  }


  const categories = await Category.find().populate("parent")

  // if (!Object.keys(query).length) {
  //   return {
  //     props: {
  //       categories: JSON.parse(JSON.stringify(categories)),
  //     },
  //   }
  // }

  const { page = 1, limit = 10 } = context.query


  const option = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort,
    populate: {
      path: 'category',
      select: '_id name',
    },
  }



  // const result = await Product.find(query).sort(sort).populate("category")

  const result = await Product.paginate(query, option)


  return {
    props: {
      products: JSON.parse(JSON.stringify(result)),
      categories: JSON.parse(JSON.stringify(categories)),
    }
  }
}
