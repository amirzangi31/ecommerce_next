import React, { useState } from 'react'
import Modal from './modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Toastify from '@/services/Toast';
import { signIn } from 'next-auth/react';

function SignModal({ show, setShow }) {
    const [form, setForm] = useState({
        email: "",
        password: "",

    });

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const router = useRouter()

    const submitHandler = async () => {
        const res = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false
        })
        if (res.status === 200) {
            router.reload()
            setShow(false)
        } else {
            Toastify("error", "ایمیل یا رمز عبور نامعتبر میباشد")
        }

    }

    return (
        <Modal show={show} setShow={setShow} >
            <div className=" sign-content">
                <form className="">
                    <div className="sign-content__title">
                        <h2>ورود</h2>
                    </div>
                    <div className="sign-content__group">
                        <label htmlFor="email">ایمیل : </label>
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            id="email"
                            onChange={changeHandler}
                            placeholder="ایمیل خود را وارد کنید ..."
                        />
                    </div>
                    <div className="sign-content__group">
                        <label htmlFor="password">رمز عبور : </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            id="password"
                            onChange={changeHandler}
                            placeholder="رمز عبور خود را وارد کنید ..."
                        />
                    </div>
                    <div className="sign-content__buttons">
                        <button className="btn-sm btn-primary w-full my-2" onClick={submitHandler} type="button">
                            ورود{" "}
                        </button>
                        <p>
                            <Link href="/signup">ثبت نام</Link>
                        </p>
                        <p>
                            <Link href="/signup">فراموشی رمز</Link>
                        </p>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default SignModal