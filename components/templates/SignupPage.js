import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import Loader from '../modules/Loader';

function SignupPage() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const submitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            const res = await axios.post("/api/auth/signup", form)
            if (res.data.status === "success") {
                setLoading(false)

            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <div className="container mx-auto pt-12">
            <div className=" sign-content">
                <form className="">
                    <div className="sign-content__title">
                        <h2>ثبت نام</h2>
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
                    <div className="sign-content__group">
                        <label htmlFor="confirmpassword">تایید رمز عبور : </label>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={form.confirmpassword}
                            id="confirmpassword"
                            onChange={changeHandler}
                            placeholder=" رمز عبور خود را وارد کنید ..."
                        />
                    </div>
                    <div className="sign-content__buttons">
                        <button disabled={loading} className="btn-sm btn-primary w-full my-2" onClick={submitHandler} type="submit">
                            {loading ?
                             
                                <Loader width="20" height="20" color="#fff" />
                                
                                :
                                "ثبت نام"
                            }
                        </button>
                        <p>
                            ایا قبلا ثبت نام کرده اید؟<Link href="/signin">ورود</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage