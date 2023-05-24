import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import FormProduct from '@/components/modules/admin/FormProduct'

function AddProductAdmin({categories}) {

  return (
    <LayoutAdmin title="اضافه کردن محصول">
        <FormProduct categories={categories} /> 
    </LayoutAdmin>
  )
}

export default AddProductAdmin