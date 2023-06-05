import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiCustomerService2Fill } from "react-icons/ri";


import { Fade } from 'react-reveal'

const data = [
  {
    title: "درخواست مشاوره خرید",
    icon: "RiCustomerService2Fill",
    des: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده",
    link: "/sales",
    image: "/images/icons/pay.gif",
  },
  {
    title: "درخواست مشاوره تعمیر",
    icon: "RiCustomerService2Fill",
    des: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده",
    link: "/repire",
    image: "/images/icons/repire.gif",
  },
  {
    title: "درخواست پرسش و پاسخ",
    icon: "RiCustomerService2Fill",
    des: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده",
    link: "/question",
    image: "/images/icons/queiz.gif",
  },
];

function RequestHomePage() {
  const [activeSliceIndex, setActiveSliceIndex] = useState(0);

  return (
    <section className="requests pb-12 mt-24">
      <div className="title justify-between items-center flex-col ">
        <h2>ارسال درخواست برای ما </h2>
        <p className="lg:w-4/12 my-4 lg:my-0">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
          صنعت چاپ و با استفاده از طراحان گرافیک است
        </p>
      </div>

      <div className="content-request ">
        <Fade right>

          <div className="flex flex-col justify-center items-center">
            {data.map((item, index) => (
              <div
                className="border-b py-2 w-full"
                key={index}
                onClick={() => setActiveSliceIndex(index)}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <span className="w-12 h-12 rounded-full bg-bg-primary center text-text-primary">
                    {item.icon === "RiCustomerService2Fill" && (
                      <RiCustomerService2Fill className="text-3xl" />
                    )}
                    {/* {item.icon === "RiCustomerService2Fill" &&<RiCustomerService2Fill className="text-3xl" />} */}
                    {/* {item.icon === "RiCustomerService2Fill" &&<RiCustomerService2Fill className="text-3xl" />} */}
                  </span>
                  <p className="text-xl text-text-primary">{item.title}</p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-text-primary "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>{" "}
                    {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg> */}
                  </span>
                </div>
                {activeSliceIndex === index && (
                  <div className="request-description">
                    {item.des}
                    <Link href={item.link} className="mr-auto">
                      <button type="button" className="btn-sm btn-primary">
                        درخواست
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Fade>
        <Fade left>
          <div>
            <div className="card p-4 h-full">
              {data.map(
                (item, index) =>
                  activeSliceIndex === index && (
                    <Image
                      key={index}
                      src={item.image}
                      alt="icons"
                      width={700}
                      height={500}
                      className="w-8/12 mx-auto"
                    />
                  )
              )}

            </div>
          </div>
        </Fade>

      </div>
    </section>
  );
}

export default RequestHomePage;
