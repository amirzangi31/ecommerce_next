import React, { useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "@/components/modules/modal/Modal";
import axios from "axios";

function RequestsAdminPage({ requests }) {
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const router = useRouter();

  const showModal = (data) => {
    setModalInfo(data);
    setModal(true);
  };

  const confirmHandler = async (id) => {
    const res = await axios.patch(`/api/request/${id}`);
    if (res.data.status === "success") {
      router.reload();
    }
  };
  const cancelHandler = () => {
    setModal(false);
  };

  return (
    <LayoutAdmin title="درخواست ها ">
      <Modal show={modal} setShow={setModal}>
        <div>
          <p className="text-xl text-center bg-white text-bg-primary rounded-lg">
            {modalInfo.type}
          </p>
          <div className="border border-white rounded-lg bg-dark-primary-admin text-white p-4 my-2">
            {modalInfo.requestText}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className="btn-secondary-admin"
              onClick={cancelHandler}
            >
              لغو
            </button>
            <button
              type="button"
              className="btn-primary-admin"
              onClick={() => confirmHandler(modalInfo._id)}
            >
              تماس گرفتید
            </button>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-4 gap-2">
        <Link href={"/admin/requests?status=all"}>
          <button
            type="button"
            className={
              router.query.status === "all"
                ? "btn-primary-admin w-full "
                : "btn-secondary-admin w-full "
            }
          >
            تمام درخواست ها{" "}
          </button>
        </Link>
        <Link href={"/admin/requests?status=repire"}>
          <button
            type="button"
            className={
              router.query.status === "repire"
                ? "btn-primary-admin w-full"
                : "btn-secondary-admin w-full"
            }
          >
            درخواست های تعمیر
          </button>
        </Link>
        <Link href={"/admin/requests?status=sale"}>
          <button
            type="button"
            className={
              router.query.status === "sale"
                ? "btn-primary-admin w-full"
                : "btn-secondary-admin w-full"
            }
          >
            درخواست های خرید
          </button>
        </Link>
        <Link href={"/admin/requests?status=counseling"}>
          <button
            type="button"
            className={
              router.query.status === "counseling"
                ? "btn-primary-admin w-full"
                : "btn-secondary-admin w-full"
            }
          >
            درخواست های مشاوره{" "}
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th>نام کاربر</th>
              <th>شماره تماس</th>
              <th>وضعیت</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} -</td>
                <td>{item.user.name}</td>
                <td>{item.user.phone}</td>
                <td>
                  <span className={!item.confirmAdmin && "text-error"}>
                    {item.confirmAdmin ? "تماس گرفته شده" : "تماس گرفته نشده"}
                  </span>
                </td>
                <td>
                  <span
                    className="text-secondary-admin cursor-pointer"
                    onClick={() => showModal(item)}
                  >
                    دیدن جزییات
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutAdmin>
  );
}

export default RequestsAdminPage;
