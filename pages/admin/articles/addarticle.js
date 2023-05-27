import AddArticleAdmin from '@/components/templates/admin/AddArticleAdmin'
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';
import React from 'react'

function AddArticle({ id }) {
    return (
        <AddArticleAdmin author={id} />
    )
}

export default AddArticle;






export async function getServerSideProps({ req }) {
    await connectDB()

    const session = await getSession({ req })
    const user = await User.findOne({ email: session?.user.email })


    return {
        props: { id: JSON.parse(JSON.stringify(user._id)) }
    }
}
