/* eslint-disable react-hooks/exhaustive-deps */
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
//AXIOS
import axios from "axios";
import { fetchUser } from "@/redux/features/user/userSlice";
import Loader from "../modules/Loader";
import { useRouter } from "next/router";




function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [changeColorNavbar, setChangeColorNavbar] = useState(true);
  const [cartCount, setCartCount] = useState(null)
  const router = useRouter()


  const session = useSession();

  const fetchCart = async () => {
    try {
      const res = await axios("/api/order?type=noPaid")
      setCartCount(res.data.data.total)
      return res.data.data.total
    } catch (error) {
      setCartCount(0)
    }
  }


  const dispatch = useDispatch()
  const { user: { user }, loading } = useSelector(state => state.user)


  useEffect(() => {
    if (session.status === "authenticated") {
      dispatch(fetchUser())
    }
  }, [session.status])


  useEffect(() =>{

    setShowSearch(false)


  } , [router.pathname])


  useEffect(() => {
    if (session.status === "authenticated") {
      fetchCart()
    }
  }, [fetchCart]);




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
                    {
                      user && (
                        <>
                          <p >نام ونام خانوادگی : <b>{user?.name}</b></p>
                          <p >ایمیل : <b>{user?.email}</b></p>
                          <p >شماره همراه : <b>{user?.phone}</b></p>

                        </>
                      )
                    }
                    <div className="flex justify-between items-center w-full">
                      <Link href={"/dashboard"}>
                        <button
                          type="button"
                          className="btn-sm btn-secondary hover:border hover:border-white"
                        >
                          داشبورد
                        </button>
                      </Link>
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
                  {
                    <span className="badge-secondary">
                      {cartCount === null ? 
                     
                      
                      <Loader width="10" height="10" color="#1649ff" />
                      
                      
                      : cartCount}
                    </span>
                  }

                </Button>
              </Link>
              {
                session.data.user.name === "admin" && (
                  <Link href="/admin">
                    <Button className="btn-sm btn-primary ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>

                    </Button>
                  </Link>
                )
              }
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
