import Link from "next/link";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import { Fade } from 'react-reveal'

function ArticlesHomePage() {
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
        <h2>جدیدترین مقالات</h2>
        <Link href={"/articles"}>
          <button type="button" className="btn-md btn-primary">
            سایر مقالات
          </button>
        </Link>
      </div>
      <div className="content-products mt-12">
        <Fade top>
          <Slider {...settings} className="product-slider">

            <div className=" p-2">
              <div className="card-a">
                <div className="card-a__image">
                  <Image
                    src="/images/products/pngimg.com - iphone_14_PNG40.png"
                    width={700}
                    height={500}
                    alt="name"
                  />
                </div>
                <div className="card-a__body">
                  <div className="card-a__title">iphone 14 pro max</div>
                  <div className="card-a__des">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از
                  </div>
                  <div className="card-a__buttons w-full">
                    <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-2">
              <div className="card-a">
                <div className="card-a__image">
                  <Image
                    src="/images/products/pngimg.com - iphone_14_PNG40.png"
                    width={700}
                    height={500}
                    alt="name"
                  />
                </div>
                <div className="card-a__body">
                  <div className="card-a__title">iphone 14 pro max</div>
                  <div className="card-a__des">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از
                  </div>
                  <div className="card-a__buttons w-full">
                    <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-2">
              <div className="card-a">
                <div className="card-a__image">
                  <Image
                    src="/images/products/pngimg.com - iphone_14_PNG40.png"
                    width={700}
                    height={500}
                    alt="name"
                  />
                </div>
                <div className="card-a__body">
                  <div className="card-a__title">iphone 14 pro max</div>
                  <div className="card-a__des">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از
                  </div>
                  <div className="card-a__buttons w-full">
                    <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-2">
              <div className="card-a">
                <div className="card-a__image">
                  <Image
                    src="/images/products/pngimg.com - iphone_14_PNG40.png"
                    width={700}
                    height={500}
                    alt="name"
                  />
                </div>
                <div className="card-a__body">
                  <div className="card-a__title">iphone 14 pro max</div>
                  <div className="card-a__des">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از
                  </div>
                  <div className="card-a__buttons w-full">
                    <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-2">
              <div className="card-a">
                <div className="card-a__image">
                  <Image
                    src="/images/products/pngimg.com - iphone_14_PNG40.png"
                    width={700}
                    height={500}
                    alt="name"
                  />
                </div>
                <div className="card-a__body">
                  <div className="card-a__title">iphone 14 pro max</div>
                  <div className="card-a__des">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از
                  </div>
                  <div className="card-a__buttons w-full">
                    <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
                  </div>
                </div>
              </div>
            </div>

          </Slider>
        </Fade>
      </div>
    </section>
  );
}

export default ArticlesHomePage;
