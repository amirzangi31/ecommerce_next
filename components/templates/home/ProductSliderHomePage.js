import Link from "next/link";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Fade } from 'react-reveal'
import shortText from "@/services/shortText";
import CardProduct from "@/components/modules/CardProduct";

function ProductSliderHomePage({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="products-home mt-24 pb-12">
      <div className="flex justify-between items-center title">
        <h2>جدیدترین محصولات</h2>
        <Link href={"/products"}>
          <button type="button" className="btn-md btn-primary">
            سایر محصولات
          </button>
        </Link>
      </div>
      <div className="content-products mt-12">
        <Fade top>
          <Slider {...settings} className="product-slider">
            {
              products.map((item, index) => (
                <CardProduct key={item._id} {...item} />
                // <div className=" p-2" key={item._id}>
                //   <div className="card-p">
                //     <div className="card-p__image">
                //       <Image
                //         src={item.images[0].link}
                //         width={700}
                //         height={500}
                //         alt="name"
                //       />
                //     </div>
                //     <div className="card-p__body">
                //       <div className="card-p__title">{item.name}</div>
                //       <div className="card-p__des">
                //       {shortText(item.description , 70)}{item.description.length > 70 && "..."}
                //       </div>
                //       <div className="card-p__price">
                //         <p>
                //           قیمت : <span>${item.price.toLocaleString()}</span>
                //         </p>
                //         <p>
                //           دسته بندی : <span>{item.category.name}</span>
                //         </p>
                //       </div>
                //       <div className="card-p__buttons">
                //         <Link href={`/products/${item._id}`}>
                //           <button type="button" className="btn-sm btn-secondary">
                //             جزِییات
                //           </button>
                //         </Link>
                //         <button type="button" className="btn-sm btn-primary">
                //           خرید
                //         </button>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))
            }

          </Slider>
        </Fade>
      </div>
    </section>
  );
}

export default ProductSliderHomePage;
