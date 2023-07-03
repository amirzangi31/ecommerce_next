import React, { useEffect, useState } from 'react'
import Toastify from '@/services/Toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Loader from '../modules/Loader';
import signValidate from '@/validations/signValidate';

function SigninPage() {

    const [loading, setLoading] = useState(false)


    const [form, setForm] = useState({
        email: "",
        password: "",

    });



    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({
        email: false,
        password: false,

    })


    useEffect(() => {
        setErrors(signValidate(form, "signin").error)
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

    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const validate = signValidate(form, "signin").errorLength
        if (validate === 0) {

            const res = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false
            })
            if (res.status === 200) {
                Toastify("success", "ورود با موفقیت انجام شد منتظر انتقال به صفحه اصلی باشید")
                router.replace("/")
                setLoading(false)
            } else {
                Toastify("error", "ایمیل یا رمز عبور نامعتبر میباشد")
                setLoading(false)
            }
        }
    }

    return (
        <div className="container mx-auto pt-12">
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
                            onFocus={focusHandler}
                            placeholder="ایمیل خود را وارد کنید ..."
                            className={
                                `
                                ${errors.email && touched.email && "error"}
                                ${!errors.email && touched.email && "success"}
                                `
                            }
                        />
                        {errors.email && touched.email && <span className='text-error-validate'>{errors.email}</span>}
                    </div>
                    <div className="sign-content__group">
                        <label htmlFor="password">رمز عبور : </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            id="password"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            placeholder="رمز عبور خود را وارد کنید ..."
                            className={
                                `
                                ${errors.password && touched.password && "error"}
                                ${!errors.password && touched.password && "success"}
                                `
                            }
                        />
                        {errors.password && touched.password && <span className='text-error-validate'>{errors.password}</span>}
                    </div>
                    <div className="sign-content__buttons">
                        <button disabled={loading} className="btn-sm btn-primary w-full my-2 flex justify-center items-center" onClick={submitHandler} type="submit">

                            {
                                loading ?

                                    <Loader width="20" height="20" color="#fff" />

                                    :
                                    "ورود"
                            }



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
        </div>
    );
}

export default SigninPage