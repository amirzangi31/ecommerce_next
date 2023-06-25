import Loader from "@/components/modules/Loader";
import Modal from "@/components/modules/modal/Modal";
import { convertToPersain } from "@/services/jalalimoment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

function OrderTrickingPage() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [infoModal, setInfoModal] = useState({});
  const [modal, setModal] = useState(false);

  //settings for slider modal
  const settings = {
    dots: true,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    initialSlide: 0,
    autoplaySpeed: 4000,
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios("/api/order");
      if (res.data.status === "success") {
        setLoading(false);
        setOrders(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();

  }, []);

  const showInfoHandler = (item) => {
    setModal(true);
    setInfoModal(item);
  };

  return (
    <div className="container mx-auto py-16 px-2">
      <Modal setShow={setModal} show={modal}>
        <div className="border border-text-secondary bg-bg-three p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs ">نام ونام خانوادگی</label>
              <p className="text-text-primary text-sm">
                {infoModal.user?.name}
              </p>
            </div>
            <div>
              <label className="text-xs ">شماره تماس</label>
              <p className="text-text-primary text-sm">
                {infoModal.user?.phone}
              </p>
            </div>
            <div>
              <label className="text-xs ">آدرس</label>
              <p className="text-text-primary text-sm">
                {infoModal.user?.address}
              </p>
            </div>
            <div>
              <label className="text-xs ">کد پستی</label>
              <p className="text-text-primary text-sm">
                {infoModal.user?.postalcode}
              </p>
            </div>
          </div>

          <div className="my-2">
            <Slider {...settings} className="product-slider order">
              {infoModal.items?.map((item) => (
                <div key={item._id} className="px-2">
                  <Link
                    href={`/products/${item.product._id}`}
                    className="text-text-primary text-center border border-text-secondary  rounded-lg bg-text-secondary block"
                  >
                    <div>{item.product.name}</div>
                    <div>تعداد : {item.quantity}</div>
                    <div>
                      قیمت کل این محصول :{" "}
                      {`${item.product.price} * ${item.quantity}  = ${
                        item.product.price * item.quantity
                      }`}
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs ">تعداد کل</label>
              <p className="text-text-primary text-sm">{infoModal.total}</p>
            </div>
            <div>
              <label className="text-xs ">قیمت کل</label>
              <p className="text-text-primary text-sm">
                {infoModal.totalPrice}
              </p>
            </div>
            <div>
              <label className="text-xs ">تایید ادمین</label>
              <p className="text-text-primary text-sm">
                {infoModal.confirmAdmin ? (
                  <span className="text-bg-primary">تایید شده</span>
                ) : (
                  <span className="text-error">در حال انتظار</span>
                )}
              </p>
            </div>
            <div>
              <label className="text-xs ">وضعیت</label>
              <p className="text-text-primary text-sm">{infoModal.step}</p>
            </div>
          </div>
        </div>
      </Modal>

      <h2 className="title-one">پیگیری سفارشات</h2>

      <div className="mt-8">
        {loading && (
          <div className="flex justify-center items-center w-full">
            <Loader width="50" height="50" color="#fff" />
          </div>
        )}

        {!loading && (
          <table className="table-orders">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>تعداد محصولات</th>
                <th>تاریخ پرداخت</th>
                <th>تاریخ تایید ادمین</th>
                <th>قیمت کل </th>
                <th>وضعیت ارسال</th>
                <th>وضعیت سبد خرید</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr
                  className={item.cancel ? "error" : "success"}
                  key={item._id}
                >
                  <td>{index + 1} - </td>

                  <td className="font-bold">{item.total}</td>
                  <td>
                    {item.isPaid ? convertToPersain(item.datePaid) : "--"}
                  </td>
                  <td>
                    {item.confirmAdmin
                      ? convertToPersain(item.dateConfirmAdmin)
                      : "در حال انتظار برای تایید ادمین"}
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.step}</td>
                  <td>{item.isPaid ? "بسته شد" : "در حال اجرا   "}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => showInfoHandler(item)}
                  >
                    دیدن جزییات
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderTrickingPage;
