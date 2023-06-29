import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SearchComponenets({ show, setShow }) {
  const [search, setSearch] = useState("")
  const router = useRouter()


  const closeSearchHandler = (e) => {
    if (e.target.id === "search" || e.target.id === "search-container") {
      setShow(false);
    }
  };



  const searchHandler = () => {

    const url = `/search?name=${search}`
    router.push(url)
  }


  return (
    <div
      className={show ? "search-modal active" : "search-modal"}
      onClick={closeSearchHandler}
      id="search"
    >
      <div className="container mx-auto" id="search-container">
        <div className="search-modal__inner">
          <input type="text" placeholder="جست و جو در محصولات" value={search} onChange={e => setSearch(e.target.value)} />
          <button type="button" onClick={searchHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <Link href={"/search"} className="btn-pish">
          <button type="button" className="btn-sm btn-primary">رفتن به صفحه جست و جو پیشرفته</button>
        </Link>
      </div>
    </div>
  );
}

export default SearchComponenets;
