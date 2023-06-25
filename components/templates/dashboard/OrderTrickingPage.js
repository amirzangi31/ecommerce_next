import Loader from "@/components/modules/Loader";
import { convertToPersain } from "@/services/jalalimoment";
import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderTrickingPage() {
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios("/api/order");
      console.log("amir");

      if (res.data.status === "success") {
        setLoading(false);
        setOrders(res.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-16 px-2">
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
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr className={item.cancel ? "error" : "success"} key={item._id}>
                  <td>{index + 1} - </td>
                  {console.log(item)}
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
