import React from 'react'
import Nav from './Nav'
import LayoutAdmin from './LayoutAdmin'
import TableProductAdmin from '@/components/modules/admin/TableProductAdmin'
import Button from '@/components/modules/Button'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

function ProductsadminPage({ products, pageCount , page }) {


  const router = useRouter()


  const changePage = ({ selected }) => {
    const pageNum = selected + 1;
    console.log(pageNum)
    router.push(`/admin/products?page=${pageNum}&limit=10`)
  }

  return (
    <LayoutAdmin title="محصولات">
      <TableProductAdmin products={products} />
      <Link href={"/admin/products/addproduct"}>
        <Button className="btn-circle-admin" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Button>
      </Link>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        initialPage={page}
        className='pagination my-2'
        previousLabel="قبلی"
        nextLabel="بعدی"
      />
    </LayoutAdmin>
  )
}

export default ProductsadminPage;

