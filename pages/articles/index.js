import ArticlesPage from '@/components/templates/articles/ArticlesPage'
import Article from '@/models/Article'
import Category from '@/models/Category'
import connectDB from '@/utils/connectDB'
import React from 'react'

function Articles({articles}) {
  return (
    <ArticlesPage articles={articles} /> 
  )
}

export default Articles


export async function getStaticProps() {

    await connectDB()
    const category = await Category.find()
    const articles = await Article.find()
  
  
    return {
      props: { articles: JSON.parse(JSON.stringify(articles)) },
      revalidate: 30
    }
  }