import React from 'react'
import Nav from './Nav'
import LayoutAdmin from './LayoutAdmin'
import TableProductAdmin from '@/components/modules/admin/TableProductAdmin'
import Button from '@/components/modules/Button'
import Link from 'next/link'

function ProductsadminPage({ products }) {
  return (
    <LayoutAdmin title="محصولات">
      <TableProductAdmin products={products} />
      <Link href={"/admin/products/addproduct"}>
        <Button className="btn-circle" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Button>
      </Link>

    </LayoutAdmin>
  )
}

export default ProductsadminPage;

