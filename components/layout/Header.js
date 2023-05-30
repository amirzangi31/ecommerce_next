import Link from "next/link";
import React from "react";
import Button from "../modules/Button";

function Header() {
  return (
    <header>
      <div className="container mx-auto  flex justify-between items-center py-2 px-2 ">
        <div className="logo-header ">ماتریکس(لگو)</div>
        <nav>
          <ul >
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="/">محصولات</Link>
            </li>
            <li>
              <Link href="/">جست و جو </Link>
            </li>
            <li>
              <Link href="/">دسته بندی ها</Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
          </ul>
        </nav>
        <div className="header-buttons">
          <Link href="/signup">
            <Button className="btn-sm btn-primary">ثبت نام / ورود</Button>
          </Link>

        </div>
        <div className="hamburger-icon">
          <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
