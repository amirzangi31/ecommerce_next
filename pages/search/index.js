import SearchPage from '@/components/templates/search/SearchPage'
import Category from '@/models/Category';
import Product from '@/models/Product';
import connectDB from '@/utils/connectDB';
import React from 'react'

function Search({ products, categories }) {

  return (
    <SearchPage products={products} categories={categories} />
  )
}

export default Search;



export const getServerSideProps = async (context) => {
  // const { name = "" , category = "", lowPrice = 0 , highPirce = 1000000000 } = context.query
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


  const categories = await Category.find().populate("parent")

  if (!Object.keys(query).length) {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    }
  }


  const result = await Product.find(query).populate("category")

  return {
    props: {
      products: JSON.parse(JSON.stringify(result)),
      categories: JSON.parse(JSON.stringify(categories)),
    }
  }
}
// javascript

// app.get('/products', (req, res) => {
//   let query = {}
//   if (req.query.category) {
//     query.category = req.query.category
//   }
//   if (req.query.name) {
//     query.name = {
//       $regex: req.query.name,
//       $options: 'i'
//     }
//   }
//   if (req.query.lowPrice) {
//     query.price = query.price || {}
//     query.price.$gte = req.query.lowPrice
//   }
//   if (req.query.highPrice) {
//     query.price = query.price || {}
//     query.price.$lte = req.query.highPrice
//   }

//   Product.find(query, (err, products) => {
//     if (err) {
//       res.status(500).send(err)
//     } else {
//       res.send(products)
//     }
//   })


