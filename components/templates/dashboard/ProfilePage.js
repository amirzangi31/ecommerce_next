import { fetchUser } from "@/redux/features/user/userSlice";
import Toastify from "@/services/Toast";
import validateProfile from "@/validations/validateProfile";
import { getBankNameFromCardNumber } from "@persian-tools/persian-tools";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";

function ProfilePage({ user }) {

  const [form, setForm] = useState({
    name: user?.name || "",
    profileimage: user?.image || "",
    postalcode: user?.postalcode || "",
    address: user?.address || "",
    password: "",
    phone: user?.phone || "",
    email: user?.email || "",
    card: user?.card || ""
  });

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({
    name: !!user?.name || false,
    profileimage: !!user?.image || false,
    postalcode: !!user?.postalcode || false,
    address: !!user?.address || false,
    password: false,
    phone: !!user?.phone || false,
    email: !!user?.email || false,
    card: !!user?.card || false,

  })


  const [confirmUpload, setConfirmUpload] = useState(false);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [saveLoading, setSaveLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)


  const dispatch = useDispatch()



  useEffect(() => {
    setErrors(validateProfile(form).error)
  }, [form, touched])




  //change inputs handlers
  const chnageImageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }

    setConfirmUpload(true);
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const focusHandler = e => {
    setTouched({
      ...touched,
      [e.target.name]: true
    })
  }

  //cancel upload image
  const cancelHandler = () => {
    setConfirmUpload(false);
    setImage("");
    setCreateObjectURL("");
  };


  // upload profile in cloudinary
  const uploadHandler = async () => {
    setUploadLoading(true)
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "adminEcommerce");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dglh3bbsp/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();



    if (data.secure_url) {
      setForm({
        ...form,
        profileimage: data.secure_url,
      });
    }

    cancelHandler();
    setUploadLoading(false)
  };



  // save info user
  const saveHandler = async () => {
    const validate = validateProfile(form).errorLength
    if (validate === 0) {
      setSaveLoading(true)
      try {
        const res = await axios.patch("/api/user", form)
        setForm({
          ...form,
          password: ""
        })
        Toastify("success", "اطلاعات با موفقیت بروزرسانی شد")
        setSaveLoading(false)
        dispatch(fetchUser())
      } catch (error) {
        console.log(error)
        Toastify("error", "اطلاعات  را به درستی وارد کنید")
        setSaveLoading(false)
      }
    } else {
      setTouched({
        name: true,
        profileimage: true,
        postalcode: true,
        address: true,
        password: true,
        phone: true,
        email: true,
        card: true,
      })
    }
  }



  return (
    <div className="container mx-auto pt-12 px-2">
      <form className="form w-full">
        <div className="flex justify-center items-center">
          {confirmUpload ? (
            <div className="confirm-upload ">
              <p className="text-center text-text-primary">آیا میخواهید این عکس را اپلود کنید؟</p>
              <div className="upload-image-element bg-bg-three border border-text-secondary mx-auto my-2  overflow-hidden">
                <Image src={createObjectURL} alt="dsaf" width={500} height={300} />
              </div>
              <div className="center gap-4">
                {
                  uploadLoading ?
                    <div>
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                      />
                    </div> :

                    (
                      <>
                        <button
                          type="button"
                          className="btn-sm btn-error"
                          onClick={cancelHandler}
                        >
                          خیر{" "}
                        </button>
                        <button
                          type="button"
                          className="btn-sm btn-primary"
                          onClick={uploadHandler}
                        >
                          بله{" "}
                        </button>
                      </>
                    )
                }
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="file"
                className="upload-image-element overflow-hidden bg-bg-three border border-text-secondary text-xs text-text-primary"
              >
                {form?.profileimage ? (
                  <Image
                    src={form?.profileimage}

                    alt="image"
                    width={700}
                    height={500}
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 my-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    عکس پروفایل
                  </>
                )}
              </label>
              <input
                type="file"
                name="file"
                id="file"
                hidden
                onChange={chnageImageHandler}
              />
            </>
          )}

        </div>
        <div className="form__group">
          <div>
            <div className="label-group w-full">

              <label htmlFor="name">نام و نام خانوادگی : </label>
              {errors.name && touched.name && <span className="text-error-validate">{errors.name}</span>}

            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onFocus={focusHandler}
              className={
                `
                ${errors.name && touched.name && "error"}
                ${!errors.name && touched.name && "success"}
                `
              }
              onChange={changeHandler}
              placeholder="رضا احمدی"
            />
          </div>
          <div>
            <div className="label-group w-full">
              <label htmlFor="phone">شماره همراه :</label>
              {errors.phone && touched.phone && <span className="text-error-validate">{errors.phone}</span>}
            </div>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                `
                ${errors.phone && touched.phone && "error"}
                ${!errors.phone && touched.phone && "success"}
                `
              }
              value={form.phone}

              placeholder="09123456789"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <div className="label-group w-full">
              <label htmlFor="postalcode"> کد پستی : </label>
              {errors.postalcode && touched.postalcode && <span className="text-error-validate">{errors.postalcode}</span>}
            </div>
            <input
              type="text"
              name="postalcode"
              id="postalcode"
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                `
                ${errors.postalcode && touched.postalcode && "error"}
                ${!errors.postalcode && touched.postalcode && "success"}
                `
              }
              value={form.postalcode}

              placeholder="76391-45145"
            />
          </div>
          <div>
            <div className="label-group w-full">
              <label htmlFor="address">آدرس :</label>
              {errors.address && touched.address && <span className="text-error-validate">{errors.address}</span>}
            </div>
            <input
              type="text"
              name="address"
              id="address"
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                `
                ${errors.address && touched.address && "error"}
                ${!errors.address && touched.address && "success"}
                `
              }
              value={form.address}

              placeholder="کرمان-زنگی آباد -خیابان شهید بهشتی"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <div className="label-group w-full">
              <label htmlFor="card">شماره کارت بانکی جهت بازگشت وجه : {<span className="text-bg-primary">{getBankNameFromCardNumber(form.card)}</span>}</label>
              {errors.card && touched.card && <span className="text-error-validate">{errors.card}</span>}
            </div>
            <input
              type="number"
              name="card"
              id="card"
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                `
                ${errors.card && touched.card && "error"}
                ${!errors.card && touched.card && "success"}
                `
              }
              value={form.card}

              placeholder="8787××××××××6037"
            />
          </div>
          <div>
            <div className="label-group w-full">
              <label htmlFor="password">رمز عبور *: </label>
              {errors.password && touched.password && <span className="text-error-validate">{errors.password}</span>}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={changeHandler}
              onFocus={focusHandler}
              className={
                `
                ${errors.password && touched.password && "error"}
                ${!errors.password && touched.password && "success"}
                `
              }
              value={form.password}

            />


          </div>
        </div>
        <span className="text-xs my-1 text-error">
          *وارد کردن رمز عبور صحیح برای تغییر اطلاعات الزامی میباشد*
        </span>

        <div className="w-full flex justify-end items-center">
          <button
            type="button"
            className={`btn-sm btn-primary ${saveLoading && "opacity-50 cursor-default"}`}
            onClick={saveHandler}
            disabled={saveLoading}>
            ذخیره اطلاعت
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
