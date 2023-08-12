import Toastify from "@/services/Toast";
import validateComment from "@/validations/validateComment";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function CommentForm({ parent, type }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    typecomment: type,
    parent

  });

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    comment: false,
  })


  useEffect(() => {
    setErrors(validateComment(form).error)
  }, [form, touched])


  const focusHandler = e => {
    setTouched({
      ...touched,
      [e.target.name]: true
    })
  }
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    const validate = validateComment(form)

    if (validate.errorLength === 0) {

      try {
        const res = await axios.post("/api/comment", form);
        if (res.data.status === 'success') {
          Toastify("success", "کامنت با موفقیت ارسال شد منتظر تایید ادمین باشید ماااچ")
          setForm({
            ...form,
            name: "",
            email: "",
            comment: "",
          })
          setTouched({
            name: false,
            email: false,
            comment: false,
          })
        }
      } catch (error) {

        Toastify("error", error)
        setTouched({
          name: false,
          email: false,
          comment: false,
        })
      }

    }
  }




  return (
    <div className="comment-form">
      <div className="comment-form__group">
        <div className="comment-form__group__body">
          <div className="flex justify-between items-center w-full">

            <label htmlFor="name">نام : </label>
            {errors.name && touched.name && <span className="text-error-validate">{errors.name}</span>}

          </div>
          <input
            type="text"
            name="name"
            onFocus={focusHandler}
            value={form.name}
            id="name"
            className={
              `
                                ${errors.name && touched.name && "error"}
                                ${!errors.name && touched.name && "success"}
                                `
            }
            onChange={changeHandler}
          />

        </div>
        <div className="comment-form__group__body">
          <div className="flex justify-between items-center w-full">
            <label htmlFor="email">ایمیل : </label>
            {errors.email && touched.email && <span className="text-error-validate">{errors.email}</span>}

          </div>
          <input
            type="text"
            name="email"
            onFocus={focusHandler}
            value={form.email}
            id="email"
            className={
              `
                                ${errors.email && touched.email && "error"}
                                ${!errors.email && touched.email && "success"}
                                `
            }
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="comment-form__textarea">
        <div className="flex justify-between items-center w-full">
          <label htmlFor="comment">نظر : </label>
          {errors.comment && touched.comment && <span className="text-error-validate">{errors.comment}</span>}

        </div>
        <textarea
          name="comment"
          id="comment"
          onFocus={focusHandler}
          cols="30"
          rows="5"
          className={
            `
                                ${errors.comment && touched.comment && "error"}
                                ${!errors.comment && touched.comment && "success"}
                                `
          }
          value={form.comment}
          onChange={changeHandler}
        ></textarea>
      </div>

      <div className="comment-form__button">
        <button type="button" className="btn-sm btn-primary" onClick={submitHandler} >ارسال نظر</button>
      </div>
    </div>
  );
}

export default CommentForm;
