import React, { useState } from "react";

import ReactPaginate from "react-paginate";

import CardProduct from "@/components/modules/CardProduct";
import { useRouter } from "next/router";
import SignModal from "@/components/modules/SignModal";









function ProductsPage({ products, pageCount, page }) {




  const [signModal, setSignModal] = useState(false)



  const router = useRouter()



  const handlePageClick = async (event) => {
    const pageNum = event.selected + 1

    router.push(`/products?page=${pageNum}&limit=8`)
  }






  return (
    <section className="py-12">
      <SignModal show={signModal} setShow={setSignModal} />
      <div className="container mx-auto px-2">
        <h2 className="text-xl text-text-primary py-2 border-b border-text-secondary">محصولات</h2>
        <div className="">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {products.map((item) => (
              <CardProduct key={item._id} {...item} signShow={setSignModal} />
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
  );
}

export default ProductsPage;
