import React, { useState } from "react";
import Pagination from "./Pagination";

import ReactPaginate from "react-paginate";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";




function ProductsPage({ products }) {

  const [productsData, setProductsData] = useState(products)
  const [loading, setLoading] = useState(false)





  const fetchData = async (e) => {
    setLoading(true)

    // try {

    //   const res = await axios(`/api/products?page=${page}`)
    //   console.log(res)

    // } catch (err) {
    //   console.log(err)
    // }
  }

  const handlePageClick = async (event) => {




  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-2">
        <h2 className="text-xl text-text-primary py-2 border-b border-text-secondary">محصولات</h2>



        <div className="content  py-4">
          {loading && <div className="h-[calc(100vh-400px)] flex justify-center items-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#1649ff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""

              visible={true}
            />
          </div>}








          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onClick={fetchData}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={20}
            previousLabel="< previous"
            className='pagination'
            initialPage={0}
            renderOnZeroPageCount={null}
          />


        </div>


      </div>
    </section>
  );
}

export default ProductsPage;
