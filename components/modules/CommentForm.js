import axios from "axios";
import React, { useState } from "react";

function CommentForm({ parent, type }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    typecomment : type,
    parent

  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    const res = await axios.post("/api/comment", form);
    console.log(res)
  }




  return (
    <div className="comment-form">
      <div className="comment-form__group">
        <div>
          <label htmlFor="name">نام : </label>
          <input
            type="text"
            name="name"
            value={form.name}
            id="name"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">ایمیل : </label>
          <input
            type="text"
            name="email"
            value={form.email}
            id="email"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="comment-form__textarea">
        <label htmlFor="comment">نظر : </label>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="5"
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
