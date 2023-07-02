import Modal from "@/components/modules/modal/Modal";
import { convertToPersain } from "@/services/jalalimoment";
import React, { useState } from "react";

const convertTypeRequest = (type) => {
  switch (type) {
    case "repire":
      return "تعمیر";
      break;
    case "sale":
      return "خرید";
      break;

    case "counseling":
      return "پرسش و پاسخ";
      break;

    default:
      break;
  }
};

function RequestFallowUpPage({ requests }) {
  const [modal, setModal] = useState(false);

  const [infoModal, setInfoModal] = useState({});

  const showModalInfo = (request) => {
    setInfoModal(request);
    setModal(true);
  };

  return (
    <div className="container px-2 py-16 mx-auto">
      <h2 className="title-one">پیگیری سفارشات</h2>

      <Modal show={modal} setShow={setModal}>
        <div className="rounded-lg border border-text-secondary bg-bg-three p-2 text-text-primary">
          {infoModal.requestText}
        </div>
      </Modal>

      {requests.length === 0 && (
        <p className="text-xl text-error text-center mt-8">
          شما هیچ درخواستی برای ما ارسال نکرده اید میتوانید از بخش ارسال درخواست
          صفحه اصلی سایت استفاده کنید
        </p>
      )}

      {requests.length > 0 && (
        <div className="mt-8 table-content ">
          <table className="table-orders">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نوع درخواست</th>
                <th>تاریخ ارسال</th>
                <th>تاریخ تایید ادمین</th>
                <th>وضعیت درخواست</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
                <tr key={item._id} className="text-text-primary">
                  <td className="font-bold">{index + 1} - </td>
                  <td>{convertTypeRequest(item.type)}</td>
                  <td>{convertToPersain(item.createdAt)}</td>
                  <td
                    className={`${
                      item.confirmAdmin ? "text-text-primary" : "text-error"
                    }`}
                  >
                    {item.confirmAdmin
                      ? convertToPersain(item.updatedAt)
                      : "----"}
                  </td>

                  <td className="text-text-primary">
                    {item.confirmAdmin
                      ? "باشما تماس گرفته شده است"
                      : "منتظر تماس مشاورین ماباشید"}
                  </td>
                  <td className="text-bg-primary">
                    <span
                      className="cursor-pointer"
                      onClick={() => showModalInfo(item)}
                    >
                      مشاهده متن ارسال شده{" "}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RequestFallowUpPage;
