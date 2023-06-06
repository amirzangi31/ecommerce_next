import React, { useState } from "react";

import ReactPaginate from "react-paginate";

import CardProduct from "@/components/modules/CardProduct";





const Items = ({ currentItems }) => {

  return (
    <>
      {currentItems.map((item, index) => (
        <CardProduct key={item._id} {...item} />
      ))}
    </>
  );
}




function ProductsPage({ products }) {

  
  



  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / 8);



  const handlePageClick = async (event) => {
    const newOffset = (event.selected * 8) % products.length;
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
  );
}

export default ProductsPage;
