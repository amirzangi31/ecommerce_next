import FormArtcile from '@/components/modules/admin/FormArtcile'
import React from 'react'
import LayoutAdmin from './LayoutAdmin'

function AddArticleAdmin({author}) {
    return (
        <LayoutAdmin title="افزودن مقاله">
            <FormArtcile author={author} />
        </LayoutAdmin>
    )
}

export default AddArticleAdmin