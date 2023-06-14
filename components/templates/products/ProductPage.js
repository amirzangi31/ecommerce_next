import CardComment from "@/components/modules/CardComment";
import CommentForm from "@/components/modules/CommentForm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageZoom from "react-image-zooom";

import { AiFillLike, AiFillStar } from "react-icons/ai";

import useSWR from "swr";
import { convertToPersain } from "@/services/jalalimoment";

function ProductPage({ product }) {
  const [activeImage, setAciveImage] = useState(0);
  const [productProperties, setProductProperties] = useState([]);

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

  const addHandler = () => {
    console.log("item");
  };

  return (
    <div>
      <div className="container mx-auto py-16">
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
                      className={`${index === activeImage && "active"}`}
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
                <button
                  type="button"
                  className=" btn-sm btn-primary"
                  onClick={addHandler}
                >
                  اضافه کردن به سبد خرید
                </button>
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
