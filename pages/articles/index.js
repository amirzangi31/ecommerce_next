import ArticlesPage from '@/components/templates/articles/ArticlesPage'
import Article from '@/models/Article'
import connectDB from '@/utils/connectDB'
import React from 'react'

function Articles({articles}) {
  return (
    <ArticlesPage articles={articles.docs} pageCount={articles.totalPages} page={articles.page - 1} /> 
  )
}

export default Articles


export async function getServerSideProps(context) {

    await connectDB()
    
    
    const { page = 1, limit = 8 } = context.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    }
  
    const articles = await Article.paginate({}, options)
  
  
    return {
      props: { articles: JSON.parse(JSON.stringify(articles)) },
      
    }
  }