import React from "react";

import { MdOutlineSendTimeExtension, MdPayment } from "react-icons/md";
import { FiGift, FiHeadphones } from "react-icons/fi";
import { Zoom } from "react-reveal";


function ServicesHomePage() {
  return (
    <section className="services" id="start">
      <div className="title justify-between items-center lg:items-start flex-col lg:flex-row ">
        <h2 className="text-center">چرا باید از سایت ما استفاده کرد؟</h2>
        <p className="lg:w-4/12 my-2 lg:my-0 text-center lg:text-right">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
          صنعت چاپ و با استفاده از طراحان گرافیک است
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Zoom>
          <div className="card p-4">
            <div>
              <div className="w-20 h-20  center bg-bg-primary text-text-primary rounded-full mx-auto">
                <MdOutlineSendTimeExtension className="text-3xl" />
              </div>
              <div className="text-center my-2 text-text-primary text-xl">
                ارسال رایگان
              </div>
              <div className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                ستون و سطرآنچنان که لازم است
              </div>
            </div>
          </div>
        </Zoom>
        <Zoom>
          <div className="card  p-4">
            <div>
              <div className="w-20 h-20  center bg-bg-primary text-text-primary rounded-full mx-auto">
                <MdPayment className="text-3xl" />

              </div>
              <div className="text-center my-2 text-text-primary text-xl">
                پرداخت آسان
              </div>
              <div className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                ستون و سطرآنچنان که لازم است
              </div>
            </div>
          </div>
        </Zoom>
        <Zoom>
          <div className="card  p-4">
            <div>
              <div className="w-20 h-20  center bg-bg-primary text-text-primary rounded-full mx-auto">
                <FiHeadphones className="text-3xl" />

              </div>
              <div className="text-center my-2 text-text-primary text-xl">
                پشتیبانی 24 ساعته
              </div>
              <div className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                ستون و سطرآنچنان که لازم است
              </div>
              <div className="title"></div>
            </div>
          </div>
        </Zoom>
        <Zoom>
          <div className="card  p-4">
            <div>
              <div className="w-20 h-20  center bg-bg-primary text-text-primary rounded-full mx-auto">
                <FiGift className="text-3xl" />

              </div>
              <div className="text-center my-2 text-text-primary text-xl">
                هدیه برای مشتریان
              </div>
              <div className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
                ستون و سطرآنچنان که لازم است
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </section>
  );
}

export default ServicesHomePage;
