import CardArticle from '@/components/modules/CardArticle';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

function ArticlesPage({ articles, pageCount, page }) {


  const router = useRouter()




  const handlePageClick = async ({ selected }) => {

    const pageNum = selected + 1

    router.push(`/articles?page=${pageNum}&limit=8`)

  }



  return (
    <section className="py-12">
      <div className="container mx-auto px-2">
        <h2 className="title-one">مقالات</h2>
        <div className="">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {articles.map((item) => (
              <CardArticle key={item._id} {...item} />
            ))}
          </div>
          <div className="py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel="بعدی >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< قبلی"
              className='pagination'
              initialPage={page}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>


    </section>
  )
}

export default ArticlesPage