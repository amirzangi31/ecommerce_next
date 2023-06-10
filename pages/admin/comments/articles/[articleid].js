import CommentsArticlePageAdmin from '@/components/templates/admin/comments/CommentsArticlePage'
import Article from '@/models/Article';
import Comment from '@/models/Comment';
import connectDB from '@/utils/connectDB';
import React from 'react'

function CommentsArticleAdmin({ article }) {
  return (
    <CommentsArticlePageAdmin article={article} />
  )
}

export default CommentsArticleAdmin




export async function getServerSideProps(context) {
  await connectDB();

  const { params } = context;
  const comments = await Comment.find();
  const article = await Article.findOne({ _id: params.articleid }).populate("comments");


  return {
    props: {
      article: JSON.parse(JSON.stringify(article))
    }
  }
}