import Link from "next/link";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { Fade } from 'react-reveal'
import shortText from "@/services/shortText";
import CardArticle from "@/components/modules/CardArticle";

function ArticlesHomePage({ articles }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed : 4000,

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
        <h2>جدیدترین مقالات</h2>
        <Link href={"/articles"}>
        <button type="button" className="btn-sm sm:btn-md btn-primary">

            سایر مقالات
          </button>
        </Link>
      </div>
      <div className="content-products mt-12">
        <Fade top>
          <Slider {...settings} className="product-slider">
            {
              articles.map((item) => (
                <CardArticle key={item._id} {...item} />
              ))
            }


          </Slider>
        </Fade>
      </div>
    </section>
  );
}

export default ArticlesHomePage;
