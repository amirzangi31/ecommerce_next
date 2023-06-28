import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

import { CgSortAz } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import CardProduct from "@/components/modules/CardProduct";

function SearchPage({ products, categories, page, pageCount }) {
  const [numberActive, setNumberActive] = useState(0);
  const router = useRouter();
  const [form, setForm] = useState({
    name: router.query.name || "",
    category: router.query.categroy || "",
    lowPrice: +router.query.lowPrice || "",
    highPrice: +router.query.highPrice || "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const activeHandler = (e, num) => {
    if (e.target.nodeName !== "INPUT" && e.target.nodeName !== "SELECT") {
      if (num === numberActive) {
        setNumberActive(0);
      } else {
        setNumberActive(num);
      }
    }
  };

  const filterHandler = () => {
    let arrayUrl = [];
    for (let key in form) {
      if (form[key] !== "") {
        arrayUrl.push(`${key}=${form[key]}`);
      }
    }

    const url = arrayUrl.join("&&");

    router.push(`search?${url}`);
  };

  //add sortBy
  const setFilter = (path) => {
    if (Object.keys(router.query).length === 0) {
      const url = `/search?sortBy=${path}`;
      router.push(url);
    } else if (router.query.sortBy) {
      const arrayUrl = [];
      for (let key in router.query) {
        if (key === "sortBy") {
          arrayUrl.push(`${key}=${path}`);
        } else {
          arrayUrl.push(`${key}=${router.query[key]}`);
        }
      }
      const url = arrayUrl.join("&&");
      router.push(`search?${url}`);
    } else {
      const url = `${router.asPath}&&sortBy=${path}`;

      router.push(url);
    }
  };

  const handlePageClick = async (event) => {
    const pageNum = event.selected + 1;

    if (router.asPath === "/search" || router.asPath === "/search?") {
      const url = `/search?page=${pageNum}`;
      router.push(url);
    } else if (router.query.page) {
      const arrayUrl = [];
      for (let key in router.query) {
        if (key === "page") {
          arrayUrl.push(`${key}=${pageNum}`);
        } else {
          arrayUrl.push(`${key}=${form[key]}`);
        }
      }
      const url = arrayUrl.join("&&");

      router.push(
        `search?${url}${
          router.query.sortBy && `&&sortBy=${router.query.sortBy}`
        }`
      );
    } else {
      const url = `${router.asPath}&&page=${pageNum}`;
      router.push(url);
    }
  };

  return (
    <div className="container mx-auto py-16 px-2 flex">
      <div className="search-navbar">
        <div
          className={`search-navbar__item ${numberActive === 1 && "active"}`}
          onClick={(e) => activeHandler(e, 1)}
        >
          <div className="search-navbar__item-title">
            <p>نام محصول</p>
            <span className="search-navbar__arrow-down">
              <MdKeyboardDoubleArrowDown className="text-3xl text-bg-primary" />{" "}
            </span>
            <span className="search-navbar__arrow-up">
              <MdKeyboardDoubleArrowUp className="text-3xl text-bg-primary" />{" "}
            </span>
          </div>
          <div className="serach-navbar__item-body">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div
          className={`search-navbar__item ${numberActive === 2 && "active"}`}
          onClick={(e) => activeHandler(e, 2)}
        >
          <div className="search-navbar__item-title">
            <p>دسته بندی</p>
            <span className="search-navbar__arrow-down">
              <MdKeyboardDoubleArrowDown className="text-3xl text-bg-primary" />{" "}
            </span>
            <span className="search-navbar__arrow-up">
              <MdKeyboardDoubleArrowUp className="text-3xl text-bg-primary" />{" "}
            </span>
          </div>
          <div className="serach-navbar__item-body">
            <select
              name="category"
              onChange={changeHandler}
              defaultValue={router.query.category}
            >
              <option value="" >
                بدون دسته بندی
              </option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div
          className={`search-navbar__item ${numberActive === 3 && "active"}`}
          onClick={(e) => activeHandler(e, 3)}
        >
          <div className="search-navbar__item-title">
            <p>قیمت</p>
            <span className="search-navbar__arrow-down">
              <MdKeyboardDoubleArrowDown className="text-3xl text-bg-primary" />{" "}
            </span>
            <span className="search-navbar__arrow-up">
              <MdKeyboardDoubleArrowUp className="text-3xl text-bg-primary" />{" "}
            </span>
          </div>
          <div className="serach-navbar__item-body price">
            <input
              type="number"
              name="lowPrice"
              value={form.lowPrice}
              onChange={changeHandler}
            />
            <span>تا</span>
            <input
              type="number"
              name="highPrice"
              value={form.highPrice}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="btn-sm btn-primary w-full"
            onClick={filterHandler}
          >
            فیلتر
          </button>
        </div>
      </div>
      <div className="products-search ">
        <div className="products-search__filter">
          <div className="flex justify-between items-center text-text-primary">
            <CgSortAz className="text-3xl" />
            نمایش براساس:
          </div>
          <div className="mx-2">
            <span
              className={router.query.sortBy === "-lasted" && "active"}
              onClick={() => setFilter("-lasted")}
            >
              جدیدترین{" "}
            </span>
            <span
              className={router.query.sortBy === "lasted" && "active"}
              onClick={() => setFilter("lasted")}
            >
              قدیمی ترین{" "}
            </span>
            <span
              className={router.query.sortBy === "-price" && "active"}
              onClick={() => setFilter("-price")}
            >
              گران ترین{" "}
            </span>
            <span
              className={router.query.sortBy === "price" && "active"}
              onClick={() => setFilter("price")}
            >
              ارزان ترین{" "}
            </span>
          </div>
        </div>
        <div className="products-search__content">
          {products.map((item) => (
            <CardProduct {...item} key={item._id} />
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="بعدی >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< قبلی"
          className="pagination"
          initialPage={page}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default SearchPage;
