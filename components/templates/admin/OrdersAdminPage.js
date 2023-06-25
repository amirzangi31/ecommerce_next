import React, { useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import Link from "next/link";
import Button from "@/components/modules/Button";
import Modal from "@/components/modules/modal/Modal";
import axios from "axios";
import Toastify from "@/services/Toast";
import { useRouter } from "next/router";

function OrdersAdminPage({ carts, isData }) {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    cartId: "",
    user: {},
    products: [],
    total: "",
    totalPrice: "",
    confirm: "",
    cancel: "",
  });

  const showInfoHandler = (data) => {
    setDataModal({
      cartId: data._id,
      user: data.user,
      products: data.items,
      total: data.total,
      totalPrice: data.totalPrice,
      confirm: data.confirmAdmin,
      cancel: data.cancel,
    });
    setModal(true);
  };

  const router = useRouter();

  const confirmHandler = async (id) => {
    try {
      const res = await axios.patch("/api/order/admin?status=true", {
        cartId: id,
      });
      if (res.data.status === "success") {
        Toastify("error", "عملیات با موفقیت انجام شد");
        setModal(false);
        router.reload();
      }
    } catch (error) {
      Toastify("error", "مشکلی پیش امده دوباره امتحان کنید");
    }
  };
  const cancelHandler = async (id) => {
    try {
      const res = await axios.patch("/api/order/admin?status=false", {
        cartId: id,
      });
      if (res.data.status === "success") {
        Toastify("error", "عملیات با موفقیت انجام شد");
        setModal(false);
        router.reload();
      }
    } catch (error) {
      Toastify("error", "مشکلی پیش امده دوباره امتحان کنید");
    }
  };

  if (!carts.length && isData === false) {
    return (
      <LayoutAdmin title="سفارشات">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/admin/orders?confirm=false&&date=today">
            <Button className="btn-secondary-admin w-full">
              سفارشات تایید نشده امروز
            </Button>
          </Link>

          <Link href="/admin/orders?confirm=true&&date=today">
            <Button className="btn-primary-admin w-full">
              سفارشات تایید شده امروز
            </Button>
          </Link>

          <Link href="/admin/orders?confirm=false&&date=month">
            <Button className="btn-secondary-admin w-full">
              سفارشات تایید نشده این ماه
            </Button>
          </Link>

          <Link href="/admin/orders?confirm=true&&date=month">
            <Button className="btn-primary-admin w-full">
              سفارشات تایید شده این ماه
            </Button>
          </Link>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin title="سفارشات">
      <Modal show={modal} setShow={setModal}>
        <div className="bg-secondary-admin p-2 rounded-lg ">
          <div className="grid grid-cols-2 gap-2 text-center">
            <p>{dataModal.user.name}</p>
            <p>{dataModal.user.phone}</p>
            <p>{dataModal.user.address}</p>
            <p>{dataModal.user.postalcode}</p>
            <p>تعدادکل : {dataModal.total}</p>
            <p>قیمت کل : {dataModal.totalPrice}</p>
          </div>
          <div className="bg-primary-admin p-1 rounded-lg">
            <div className="flex justify-start gap-2 items-center overflow-x-scroll overflow-y-hidden py-1">
              {dataModal.products.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-secondary-admin  w-36 p-1 rounded-lg text-center"
                >
                  <Link href={`/admin/products/${item.product._id}`}>
                    {item.product.name}
                  </Link>

                  <p>تعداد : {item.quantity}</p>
                  <p>قیمت : {item.product.price}</p>
                  <p>قیمت کل : {item.quantity * item.product.price}</p>
                </div>
              ))}
            </div>
          </div>
          {dataModal.confirm ? (
            <div className="text-center">
              وضعیت :
              {dataModal.cancel ? (
                <span className="text-error font-bold text-xl">
                  سبد خرید لغو شده
                </span>
              ) : (
                <span className="text-bg-primary font-bold text-xl">
                  سبد خرید تایید شده
                </span>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-row-reverse gap-2 py-2">
              <button
                type="button"
                onClick={() => confirmHandler(dataModal.cartId)}
                className="btn-primary-admin"
              >
                تایید سبد خرید
              </button>
              <button
                type="button"
                onClick={() => cancelHandler(dataModal.cartId)}
                className="btn-error-admin"
              >
                لغو سبد خرید
              </button>
            </div>
          )}
        </div>
      </Modal>

      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th>نام خریدار</th>
              <th>تعداد محصولات</th>
              <th>قیمت کل</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                {console.log(item.confirmAdmin)}
                <td className={`${item.cancel === true && "bg-error"}`}>
                  {item.user.name}
                </td>
                <td>{item.total}</td>
                <td>{item.totalPrice} ريال</td>
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
      </div>
    </LayoutAdmin>
  );
}

export default OrdersAdminPage;
