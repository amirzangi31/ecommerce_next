import CardArticle from '@/components/modules/CardArticle';
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
const Items = ({ currentItems }) => {

  return (
    <>
      {currentItems.map((item, index) => (
        <CardArticle key={item._id} {...item} />
      ))}
    </>
  );
}
function ArticlesPage({articles}) {



  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;

  const currentItems = articles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articles.length / 8);



  const handlePageClick = async (event) => {
    const newOffset = (event.selected * 8) % articles.length;
    setItemOffset(newOffset);
  }



  return (
    <section className="py-12">
      <div className="container mx-auto px-2">
        <h2 className="text-xl text-text-primary py-2 border-b border-text-secondary">محصولات</h2>
        <div className="h-screen">
          <div className="py-3">
            <ReactPaginate
              breakLabel="..."
              nextLabel="بعدی >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< قبلی"
              className='pagination'
              initialPage={0}
              renderOnZeroPageCount={null}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Items currentItems={currentItems} />
          </div>
        </div>
      </div>


    </section>
  )
}

export default ArticlesPage