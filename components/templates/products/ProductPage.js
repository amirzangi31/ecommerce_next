import CardComment from "@/components/modules/CardComment";
import CommentForm from "@/components/modules/CommentForm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageZoom from "react-image-zooom";

import { AiFillLike, AiFillStar } from "react-icons/ai";

import useSWR from "swr";
import { convertToPersain } from "@/services/jalalimoment";
import axios from "axios";
import Toastify from "@/services/Toast";
import { useSession } from "next-auth/react";
import { isInCart, productCount } from "@/services/helper";
import { ThreeDots } from "react-loader-spinner";
import { BsTrash } from "react-icons/bs";
import SignModal from "@/components/modules/SignModal";
import Loader from "@/components/modules/Loader";

function ProductPage({ product }) {
  const [activeImage, setAciveImage] = useState(0);
  const [productProperties, setProductProperties] = useState([]);
  const [cart, setCart] = useState({})
  const [loadingCart, setLoadingCart] = useState(true)
  const [signModal, setSignModal] = useState(false)




  const session = useSession()





  const fetchCart = async () => {
    setLoadingCart(true)

    try {
      const res = await axios("/api/order?type=noPaid")
      setCart(res.data.data)
      setLoadingCart(false)
      return res.data.data
    } catch (error) {
      setCart({})
      setLoadingCart(false)
    }
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const {
    images,
    name,
    _id,
    price,
    category,
    properties,
    description,
    createdAt,
  } = product;

  //for show properties product in page
  const changeProperties = () => {
    const result = [];

    let test = Object.keys(properties);

    for (let i = 0; i < test.length; i++) {
      let obj = { property: test[i], value: properties[test[i]] };
      result.push(obj);
    }

    setProductProperties(result);
  };


  useEffect(() => {
    if (properties) {
      changeProperties();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const imageActiveHandler = (i) => {
    setAciveImage(i);
  };

  const { data, error, isLoading } = useSWR(
    `/api/comment?parentid=${_id}&parenttype=product`,
    (url) => fetch(url).then((res) => res.json())
  );



  const increaseProduct = async () => {
    setLoadingCart(true)
    const res = await axios.patch(
      `/api/order/${cart._id}?type=increase&&product=${_id}`
    );
    if (res.data.status === "success") {
      await fetchCart()
    }
    setLoadingCart(false)
  };


  const decreaseProduct = async () => {
    setLoadingCart(true)
    const res = await axios.patch(
      `/api/order/${cart._id}?type=decrease&&product=${_id}`
    );
    if (res.data.status === "success") {
      await fetchCart()


    }
    setLoadingCart(false)
  };

  async function deleteProduct() {
    setLoadingCart(true)
    const res = await axios.patch(
      `/api/order/${cart._id}?type=delete&&product=${_id}`
    );
    if (res.data.status === 'success') {
      await fetchCart()
    }
    setLoadingCart(false)
  }


  const addHandler = async () => {
    if (session.status === "unauthenticated") {
      setSignModal(true)
      return
    }
    const res = await axios.post("/api/order", {
      productId: _id
    })
    if (res.data.status === "success") {
      Toastify("success", res.data.message)
      await fetchCart()
    }
  };


  return (
    <div>
      <div className="container mx-auto py-16 px-2">
        <SignModal show={signModal} setShow={setSignModal} />

        <div className="product-details">
          <div className="product-details__up">
            <div className="product-details__up-right ">
              <div className="product-details__up-images">
                {images.map((item, index) => (
                  <div
                    key={item.link}
                    onClick={() => imageActiveHandler(index)}
                  >
                    <Image
                      src={item.link}
                      alt="product_image"
                      width={700}
                      height={500}
                      className={`${index === activeImage && "active"}`}
                    />
                  </div>
                ))}
              </div>

              <div className="product-details__up-image">
                {images.map((item, index) => (
                  <>
                    <ImageZoom
                      src={item.link}
                      key={item.name}
                      alt="Zoom-images"
                      className={`${index === activeImage && "active"} rounded-lg`}
                      zoom="300"
                    />
                  </>
                ))}
              </div>
            </div>
            <div className="product-details__up-left ">
              <div className="h-1/6 "></div>
              <p className="text-xs text-text-secondary text-center w-full">
                *این محصول در تاریخ{" "}
                <b className="text-text-primary">
                  {convertToPersain(createdAt)}
                </b>{" "}
                اضافه شده است*
              </p>
              <div className="flex items-center ">
                <span>
                  تعداد نظرات :{" "}
                  <b className="text-text-primary">{data?.data.length}</b>
                </span>
                <span className="flex justify-between items-center">
                  <AiFillStar className="text-yellow-300" />
                  <b className="text-text-primary"> 4.1</b>
                </span>
                <span className="flex justify-between items-center">
                  <b className="text-text-primary"> 86%</b>
                  <AiFillLike className="text-bg-primary" />
                </span>
              </div>

              <div className="product-details__title">
                <span className="">نام محصول : </span>
                <h2>{name}</h2>
              </div>
              <div className="product-details__price">
                <span className="">قیمت محصول : </span>
                {price.toLocaleString()}ريال
              </div>
              <div className="product-details__category">
                <span className="">دسته بندی محصول : </span>
                {category.name}
              </div>
              <div className="product-details__quantity">
                <span className="">موجودی محصول : </span>
                {12}عدد
              </div>
              <div className="product-details__add ">
                {loadingCart === true && session.status === "authenticated" &&
                 
                <Loader width="40" height="40" color="#fff" />
                
                
                }

                {session.status === "unauthenticated" && <button
                  type="button"
                  className=" btn-sm btn-primary"
                  onClick={addHandler}
                >
                  اضافه کردن به سبد خرید
                </button>
                }

              {
                  !loadingCart && !isInCart(cart, _id) &&
                  <button
                    type="button"
                    className=" btn-sm btn-primary"
                    onClick={addHandler}
                  >
                    اضافه کردن به سبد خرید
                  </button>
                }
                {
                  !loadingCart && isInCart(cart, _id)
                  &&
                  <button type="button" className="btn-sm btn-primary" onClick={increaseProduct}>+</button>
                }
                {!loadingCart && productCount(cart, _id) && <p className="mx-4 inline-block text-2xl text-text-primary">{productCount(cart, _id)}</p>}
                {
                  !loadingCart && productCount(cart, _id) === 1 &&
                  <button type="button" className="btn-sm btn-error" onClick={deleteProduct}>
                    <BsTrash className="text-2xl" />
                  </button>
                }
                {
                  !loadingCart && productCount(cart, _id) > 1 &&
                  <button type="button" className="btn-sm btn-error" onClick={decreaseProduct}>-</button>
                } 


              </div>
            </div>
          </div>
          <div className="product-details__down w-full my-12 ">
            <div>
              {productProperties.length > 0 && (
                <table className="w-full ">
                  <thead className="">
                    <tr className="box-titleone">
                      <th></th>
                      <th className="text-text-primary py-2 ">ویژگی</th>
                      <th className="text-text-primary py-2 ">مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productProperties.length > 0 &&
                      productProperties.map((item, index) => (
                        <tr key={item.property} className="text-text-primary ">
                          <td>{index + 1} - </td>
                          <td className="text-center py-2">{item.property}</td>
                          <td className="text-center py-2">{item.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <div className="box-title">درباره محصول</div>
              <div className="product-details__description">{description}</div>
            </div>
          </div>
        </div>

        {data?.data.length > 0 && (
          <>
            <div className="box-title">نظرات</div>
            <div className="comment-content">
              {data.data.map((item, index) => (
                <CardComment key={item._id} {...item} />
              ))}
            </div>
          </>
        )}

        <div className="box-title">ارسال نظر</div>
        <CommentForm parent={_id} type="product" />
      </div>
    </div>
  );
}

export default ProductPage;
