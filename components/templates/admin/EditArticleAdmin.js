import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import FormArtcile from '@/components/modules/admin/FormArtcile'

function EditArticleAdmin({ author, article }) {
    return (
        <LayoutAdmin title="ویرایش مقاله">
            <FormArtcile author={author} article={article} edited={true} />
        </LayoutAdmin>
    )
}

export default EditArticleAdmin