import { convertToPersain } from "@/services/jalalimoment";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "../modal/Modal";

function CardCommentAdmin({
  name,
  answer,
  comment,
  accepted,
  createdAt,
  like,
  _id,
  typecomment,
  parent
}) {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [answerForm, setAnswerForm] = useState(answer || "");

  const router = useRouter();



  const successHandler = (status) => {
    if (status === "success") {
      router.reload();
    } else {
      return;
    }
  };

  const acceptHandler = async () => {
    try {
      const res = await axios.patch(`/api/comment/${_id}?type=accepted`);
      successHandler(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`/api/comment/${_id}?parent=${parent}`);

      successHandler(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const hideModal = (status) => {
    if (status === "delete") {
      setDeleteModal(false)
    } else {

      setShowModal(false);
      setAnswerForm("");
    }
  };

  const answerHandler = async () => {
    try {
      const res = await axios.patch(`/api/comment/${_id}?type=edit`, {
        answer: answerForm,
      });
      if (res.data.status === "success") {
        router.reload();
        setAnswerForm("");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-comment">

      <Modal show={showModal} setShow={setShowModal}>
        <p className="py-2 text-center text-white text-xl">
          پاسخ به کامنت {name}
        </p>
        <textarea
          name="answer"
          value={answerForm}
          onChange={(e) => setAnswerForm(e.target.value)}
          cols="30"
          className="w-full p-2 rounded-lg"
          rows="10"
        ></textarea>
        <div className="flex justify-center items-center gap-2 py-2">
          <button type="button" className="btn-error-admin" onClick={hideModal}>
            لغو{" "}
          </button>
          <button
            type="button"
            className="btn-primary-admin"
            onClick={answerHandler}
          >
            ارسال
          </button>
        </div>
      </Modal>
      <Modal show={deleteModal} setShow={setDeleteModal}>
        <p className="w-full text-center text-xl text-white">
          آیا مطمعن هستید که میخواهید کامنت{name} را حذف کنید ؟
        </p>
        <div className="flex justify-center items-center gap-2 py-4">
          <button type="button" className="btn-primary-admin" onClick={() => hideModal("delete")}>لغو</button>
          <button type="button" className="btn-error-admin" onClick={deleteHandler}>حذف</button>
        </div>
      </Modal>
      <div className="card-comment__header">
        <div className="flex justify-between items-center">
          <span className="card-comment__profile">
            {name.split("").slice(0, 1)}
          </span>
          <span className="card-comment__name">{name}</span>
        </div>
        <div className="flex justify-center items-center gap-1">
          {accepted ? (
            <button
              type="button"
              className="btn-error-admin text-xs"
              onClick={acceptHandler}
            >
              حذف از نمایش
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary-admin text-xs"
              onClick={acceptHandler}
            >
              تایید برای نمایش
            </button>
          )}
          {answer.trim() !== "" ? (
            <button
              type="button"
              className="btn-secondary-admin text-xs"
              onClick={() => setShowModal(true)}
            >
              ویرایش پاسخ
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary-admin text-xs"
              onClick={() => setShowModal(true)}
            >
              پاسخ دادن
            </button>
          )}

          <button
            type="button"
            className="btn-error-admin text-xs"
            onClick={() => setDeleteModal(true)}
          >
            حذف
          </button>
        </div>
        <div className="card-comment__date">
          <p>{convertToPersain(createdAt)}</p>
        </div>
      </div>
      <div className="card-comment__body">
        <div className="flex-1">
          <label>کاربر</label>
          <div className="card-comment__user">{comment}</div>
          {answer.trim() !== "" && (
            <>
              <label> ادمین</label>
              <div className="card-comment__admin">{answer}</div>
            </>
          )}
        </div>
        <div className="card-comment__like">
          <span className="flex justify-between items-center flex-col">
            تعداد لایک <b>{like}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardCommentAdmin;
