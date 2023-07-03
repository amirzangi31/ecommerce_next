import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Loader from '../modules/Loader';
import { useRouter } from 'next/router';
import Toastify from '@/services/Toast';
import signValidate from '@/validations/signValidate';

function SignupPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmpassword: false,
    })


    useEffect(() => {


        setErrors(signValidate(form, "signup").error)
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
   





    const submitHandler = async (e) => {
        e.preventDefault()

        const validate = signValidate(form, "signup").errorLength
        if (validate === 0) {
            setLoading(true)
            try {
                const res = await axios.post("/api/auth/signup", form)
                if (res.data.status === "success") {
                    setLoading(false)
                    Toastify("success", "ثبت نام با موفقیت انجام شد")
                    router.push("/signin")
                }

            } catch (error) {
                Toastify("error", "لطفا اطلاعات معتبر وارد کنید")
                setLoading(false)
            }
        }
    }




    return (
        <div className="container mx-auto pt-12">
            <div className=" sign-content ">
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
                    <div className="sign-content__group">
                        <label htmlFor="confirmpassword">تایید رمز عبور : </label>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={form.confirmpassword}
                            id="confirmpassword"
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            placeholder=" رمز عبور خود را وارد کنید ..."
                            className={
                                `
                                ${errors.confirmpassword && touched.confirmpassword && "error"}
                                ${!errors.confirmpassword && touched.confirmpassword && "success"}
                                `
                            }
                        />
                        {errors.confirmpassword && touched.confirmpassword && <span className='text-error-validate'>{errors.confirmpassword}</span>}
                    </div>
                    <div className="sign-content__buttons">
                        <button disabled={loading} className="btn-sm btn-primary w-full flex justify-center items-center my-2" onClick={submitHandler} type="submit">
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