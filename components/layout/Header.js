import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../modules/Button";
import SearchComponenets from "./SearchComponenets";
import { BsCart } from "react-icons/bs";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [changeColorNavbar, setChangeColorNavbar] = useState(true);


  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 0) {
      setChangeColorNavbar(false);
    } else {
      setChangeColorNavbar(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [])


  return (
    <header className={`${changeColorNavbar ? "" : "active"}`}>
      <div className="container mx-auto  flex justify-between items-center py-2 px-2 ">
        <div className="logo-header ">ماتریکس(لگو)</div>
        <nav className={showMenu ? "active" : ""}>
          <div className="close-menu-toggle" onClick={() => setShowMenu(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <ul>
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="/">محصولات</Link>
            </li>
            <li>
              <div
                className="search"
                onClick={() => {
                  setShowSearch(true);
                  setShowMenu(false);
                }}
              >
                جست و جو{" "}
              </div>
            </li>
            <li>
              <Link href="/">دسته بندی ها</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <div className="drop-down-nav ">
                <div className="drop-down-nav__inner">
                  <div className="drop-down-nav__link">
                    <Link href="/">link_1</Link>
                  </div>
                  <div className="drop-down-nav__link">
                    <Link href="/">link_2</Link>
                  </div>
                  <div className="drop-down-nav__link">
                    <Link href="/">link_3</Link>
                  </div>
                  <div className="drop-down-nav__link">
                    <Link href="/">link_4</Link>
                  </div>
                  <div className="drop-down-nav__link">
                    <Link href="/">link_5</Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link href="/">درباره ما</Link>
            </li>
            <li className="lg:hidden">
              <Link href="/">سبد خرید</Link>
            </li>
          </ul>
        </nav>
        <div className="header-buttons">
          <Link href="/signup">
            <Button className="btn-sm btn-primary">ثبت نام / ورود</Button>
          </Link>
          {/* <Link href="/cart">
            <Button className="btn-sm btn-primary ">
              <BsCart className="text-xl" /> 
            </Button>
          </Link> */}
        </div>
        <div className="hamburger-icon">
          <button type="button" onClick={() => setShowMenu(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <SearchComponenets show={showSearch} setShow={setShowSearch} />
      </div>
    </header>
  );
}

export default Header;
