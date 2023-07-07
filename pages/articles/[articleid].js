import React from 'react'
import ArticlePage from '@/components/templates/articles/ArticlePage'
import Article from '@/models/Article'
import Category from '@/models/Category'
import Comment from '@/models/Comment'
import connectDB from '@/utils/connectDB'

function ArticleP({ article }) {

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


  const data = articles.slice(0, 8)


  const paths = data.map(item => ({
    params: { articleid: item._id.toString() }
  }))


  return {
    paths,
    fallback: "blocking"
  }
}



export async function getStaticProps(context) {
  await connectDB()
  const { params } = context;
  const categories = await Category.find()
  const id = params.articleid

  const article = await Article.findOne({ _id: id })


  const comments = await Comment.find({ article: id })




  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
      
    },
    revalidate: 24 * 60 * 60 //one day
  }
}