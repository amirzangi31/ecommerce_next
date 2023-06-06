import ArticlePage from '@/components/templates/articles/ArticlePage'
import Article from '@/models/Article'
import Category from '@/models/Category'
import connectDB from '@/utils/connectDB'
import React from 'react'

function ArticleP({article}) {
  return (
    <ArticlePage article={article} /> 
  )
}

export default ArticleP





export async function getStaticPaths() {
    await connectDB()
    const category = await Category.find()
    const articles = await Article.find()
    const test = JSON.parse(JSON.stringify(articles))
  
  
    const data = test.slice(0, 8)
  
  
    const paths = data.map(item => ({
      params: { articleid: item._id.toString() }
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
    const id = params.articleid
  
    const article = await Article.findOne({ _id: id })
  
  
    return {
      props: { article: JSON.parse(JSON.stringify(article)) }
    }
  }