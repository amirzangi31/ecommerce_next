import React, { useEffect, useState } from "react";
import Link from "next/link";

//COMPONENTS
import SearchComponenets from "./SearchComponenets";
import Button from "../modules/Button";

//SPINNER
import { RotatingLines } from "react-loader-spinner";

// NEXTAUTH
import { signOut, useSession } from "next-auth/react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/user/userSlice";

function Header() {
  const session = useSession();

  //get user
  const user = useSelector((state) => state.user.user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (session.status === "authenticated") {
      dispatch(fetchUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
  }, []);

  //sign out
  const signoutHandler = async () => {
    const res = await signOut();
  };



  return (
    <header className={`${changeColorNavbar ? "" : "active"}`}>
      <div className="container mx-auto  flex justify-between items-center py-2 px-2 relative ">
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
              <Link href="/products">محصولات</Link>
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
        {session.status === "loading" && (
          <span>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="36"
              visible={true}
            />
          </span>
        )}
        <div className="header-buttons">
          {session.status === "unauthenticated" && (
            <Link href="/signup">
              <Button className="btn-sm btn-primary">ثبت نام / ورود</Button>
            </Link>
          )}
          {session.status === "authenticated" && (
            <div className="flex justify-between items-center gap-2">
              <div className="btn-sm btn-primary relative cursor-pointer profile-btn">
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <div className="profile-header">
                  <div className="profile-header__content">
                    {!user && <div className="w-full flex justify-center items-center">
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="36"
                        visible={true}
                      />
                    </div>}
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                    <div className="flex justify-between items-center w-full">
                      <Link href={"/dashboard/profile"}>
                        <button
                          type="button"
                          className="btn-sm btn-secondary hover:border hover:border-white"
                        >
                          ویرایش پروفایل
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn-sm btn-secondary hover:border hover:border-white"
                        onClick={signoutHandler}
                      >
                        خروج
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/cart">
                <Button className="btn-sm btn-primary relative">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span className="badge-secondary">0</span>
                </Button>
              </Link>
            </div>
          )}
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
