import SignModal from "@/components/modules/SignModal";
import Modal from "@/components/modules/modal/Modal";
import Toastify from "@/services/Toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiCustomerService2Fill } from "react-icons/ri";

import { Fade } from "react-reveal";

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

const successHandler = (status) => {
  if (status === "success") {
    Toastify("success", "درخواست باموفقیت ارسال شد");
  } else {
    return;
  }
};

function RequestHomePage() {
  const [activeSliceIndex, setActiveSliceIndex] = useState(0);
  const [modalSale, setModalSale] = useState(false);
  const [modalRepire, setModalRepire] = useState(false);
  const [modalCounseling, setModalCounseling] = useState(false);
  const [modalSign, setModalSign] = useState(false);

  const [form, setForm] = useState({
    sale: "",
    repire: "",
    counseling: "",
  });

  const session = useSession();

  const showModal = (ind) => {
    if (session.status === "authenticated") {
      switch (ind) {
        case 0:
          setModalSale(true);
          break;
        case 1:
          setModalRepire(true);
          break;
        case 2:
          setModalCounseling(true);
          break;

        default:
          break;
      }
    } else if (session.status === "loading") {
      return;
    } else {
      setModalSign(true);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendHandler = async (type) => {
    if (type === "sale") {
      try {

        const res = await axios.post(`/api/request?type=${type}`, {
          requestText: form.sale,
        });

        successHandler(res.data.status);
        setForm({
          ...form,
          sale: "",
        });
        setModalSale(false);
      } catch (error) {
        Toastify("error", "لطفا درخواست خود را وارد کنید")
      }
    } else if (type === "repire") {
      try {

        const res = await axios.post(`/api/request?type=${type}`, {
          requestText: form.repire,
        });

        successHandler(res.data.status);
        setForm({
          ...form,
          repire: "",
        });
        setModalRepire(false);
      } catch (error) {
        Toastify("error", "لطفا درخواست خود را وارد کنید")
      }
    } else if (type === "counseling") {
      try {

        const res = await axios.post(`/api/request?type=${type}`, {
          requestText: form.counseling,
        });

        successHandler(res.data.status);
        setForm({
          ...form,
          counseling: "",
        });
        setModalCounseling(false);
      } catch (error) {
        Toastify("error", "لطفا درخواست خود را وارد کنید")
      }
    }
  };

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

      <Modal show={modalSale} setShow={setModalSale}>
        <div className="bg-bg-three border border-text-secondary rounded-lg  p-2">
          <p className="text-bg-primary text-center text-xl ">
            ارسال درخواست برای مشاوره خرید
          </p>
          <p className="text-sm text-text-primary text-center my-4">
            بعد از ارسال درخواست منتظر تماس مشاورین ما باشید و همچنین میتوانید
            درخواست خود از بخش پیگیری درخواست در داشبورد پیگیری کنید ممنونیم از
            انتخاب شما
          </p>
          <textarea
            onChange={changeHandler}
            name="sale"
            value={form.sale}
            rows="10"
            cols="30"
            className="w-full bg-transparent border border-text-secondary rounded-lg"
            placeholder="درخواست ...."
          ></textarea>
          <div className="flex justify-end items-center">
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={() => sendHandler("sale")}
            >
              ارسال درخواست{" "}
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={modalRepire} setShow={setModalRepire}>
        <div className="bg-bg-three border border-text-secondary rounded-lg  p-2">
          <p className="text-bg-primary text-center text-xl ">
            ارسال درخواست برای مشاوره تعمیر
          </p>
          <p className="text-sm text-text-primary text-center my-4">
            بعد از ارسال درخواست منتظر تماس مشاورین ما باشید و همچنین میتوانید
            درخواست خود از بخش پیگیری درخواست در داشبورد پیگیری کنید ممنونیم از
            انتخاب شما
          </p>
          <textarea
            onChange={changeHandler}
            name="repire"
            value={form.repire}
            rows="10"
            cols="30"
            className="w-full bg-transparent border border-text-secondary rounded-lg"
            placeholder="درخواست ...."
          ></textarea>
          <div className="flex justify-end items-center">
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={() => sendHandler("repire")}
            >
              ارسال درخواست{" "}
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={modalCounseling} setShow={setModalCounseling}>
        <div className="bg-bg-three border border-text-secondary rounded-lg  p-2">
          <p className="text-bg-primary text-center text-xl ">
            ارسال درخواست برای پرسش و پاسخ
          </p>
          <p className="text-sm text-text-primary text-center my-4">
            بعد از ارسال درخواست منتظر تماس مشاورین ما باشید و همچنین میتوانید
            درخواست خود از بخش پیگیری درخواست در داشبورد پیگیری کنید ممنونیم از
            انتخاب شما
          </p>
          <textarea
            onChange={changeHandler}
            name="counseling"
            value={form.counseling}
            rows="10"
            cols="30"
            className="w-full bg-transparent border border-text-secondary rounded-lg"
            placeholder="درخواست ...."
          ></textarea>
          <div className="flex justify-end items-center">
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={() => sendHandler("counseling")}
            >
              ارسال درخواست{" "}
            </button>
          </div>
        </div>
      </Modal>

      <SignModal show={modalSign} setShow={setModalSign}></SignModal>

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

                    <button
                      type="button"
                      className="btn-sm btn-primary mr-auto"
                      onClick={() => showModal(index)}
                    >
                      درخواست
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Fade>

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

      </div>
    </section>
  );
}

export default RequestHomePage;
