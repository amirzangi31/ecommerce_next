import { useRouter } from "next/router";
import React, { useState } from "react";

import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

function SearchPage({ products ,categories}) {


  const [numberActive, setNumberActive] = useState(0);
  const [form, setForm] = useState({
    name: "",
    category: "",
    lowPrice: "",
    highPrice: "",
  });

  const router = useRouter();

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
    console.log("first")
    let arrayUrl = [];
    for (let key in form) {
      if (form[key] !== "") {
        arrayUrl.push(`${key}=${form[key]}`);
      }
    }

    const url = arrayUrl.join("&&");

    router.push(`search?${url}`);
  };

  return (
    <div className="container mx-auto py-16 px-2">
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
            <select name="category" onChange={changeHandler}>
              {categories.length > 0 &&  categories.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              name="category"
              value={form.category}
              onChange={changeHandler}
            /> */}
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
    </div>
  );
}

export default SearchPage;
