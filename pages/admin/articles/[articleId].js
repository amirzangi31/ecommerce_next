import EditArticleAdmin from '@/components/templates/admin/EditArticleAdmin';
import Article from '@/models/Article';
import User from '@/models/User';
import { getSession } from 'next-auth/react';
import React from 'react'

function EditArticle({ id , article }) {
    
    return (
        <EditArticleAdmin author={id}  article={article} />
    )
}

export default EditArticle;


export async function getServerSideProps({ req, query }) {
    const session = await getSession({ req })
    const user = await User.findOne({ email: session?.user.email })

    const { articleId } = query
    const article = await Article.findOne({ _id: articleId })


    return {
        props: { id: JSON.parse(JSON.stringify(user._id)), article: JSON.parse(JSON.stringify(article)) }
    }
}