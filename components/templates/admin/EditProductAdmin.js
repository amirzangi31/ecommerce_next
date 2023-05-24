import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import FormProduct from '@/components/modules/admin/FormProduct'

function EditProductAdmin({ product, categories }) {
    return (
        <LayoutAdmin title="ویرایش محصول">
            <FormProduct {...product} edit={true} categories={categories} />
        </LayoutAdmin>
    )
}

export default EditProductAdmin