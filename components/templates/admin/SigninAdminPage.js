import Button from "@/components/modules/Button";
import Toastify from "@/services/Toast";
import axios from "axios";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router";
import React, { useState } from "react";

function SigninAdminPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter()

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    if (form.email.trim() === "" || form.password.trim() === "") {
      Toastify("error", "اطلاعات را به درستی وارد کنید")
    } else {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false
      })

      if (res.status === 200) {
        router.replace("/admin")
      } else {
        Toastify("error", "اطلاعات را به درستی وارد کنید")
        setForm
      }
    }
  };

  return (
    <div className="sign-content-admin">
      <form>
        <h2>ورود ادمین</h2>
        <div>
          <label htmlFor="email">ایمیل : </label>
          <input
            type="text"
            onChange={changeHandler}
            name="email"
            value={form.email}
          />
        </div>
        <div>
          <label htmlFor="email">رمز عبور : </label>
          <input
            type="text"
            onChange={changeHandler}
            name="password"
            value={form.password}
          />
        </div>
        <Button handler={submitHandler} className="btn-primary">
          ورود
        </Button>
      </form>
    </div>
  );
}

export default SigninAdminPage;
