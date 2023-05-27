import ArticlesPageAdmin from '@/components/templates/admin/ArticlesPageAdmin'
import Article from '@/models/Article';
import connectDB from '@/utils/connectDB';
import React from 'react'

function Articles({ articles }) {

  return (
    <ArticlesPageAdmin articles={articles} />
  )
}

export default Articles;



export async function getServerSideProps({ req }) {
  await connectDB()

  const articles = await Article.find()






  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) }
  }

}