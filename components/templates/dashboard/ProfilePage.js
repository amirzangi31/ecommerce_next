import Button from "@/components/modules/Button";
import Toastify from "@/services/Toast";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

function ProfilePage({ user }) {

  const [form, setForm] = useState({
    name: user?.name || "",
    profileimage: user?.image || "",
    postalcode: user?.postalcode || "",
    address: user?.address || "",
    password: "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [confirmUpload, setConfirmUpload] = useState(false);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [saveLoading, setSaveLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)







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
    setSaveLoading(true)
    try {
      const res = await axios.patch("/api/user", form)
      setForm({
        ...form,
        password: ""
      })
      Toastify("success", "اطلاعات با موفقیت بروزرسانی شد")
      setSaveLoading(false)
    } catch (error) {
      Toastify("error", "اطلاعات  را به درستی وارد کنید")
      setSaveLoading(false)
    }
  }



  return (
    <div className="container mx-auto pt-12">
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
                {form.profileimage ? (
                  <Image
                    src={form.profileimage}

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
            <label htmlFor="name">نام و نام خانوادگی : </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={changeHandler}
              placeholder="رضا احمدی"
            />
          </div>
          <div>
            <label htmlFor="phone">شماره همراه :</label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={changeHandler}
              value={form.phone}
              placeholder="09123456789"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label htmlFor="postalcode"> کد پستی : </label>
            <input
              type="text"
              name="postalcode"
              id="postalcode"
              onChange={changeHandler}
              value={form.postalcode}
              placeholder="76391-45145"
            />
          </div>
          <div>
            <label htmlFor="address">آدرس :</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={changeHandler}
              value={form.address}
              placeholder="کرمان-زنگی آباد -خیابان شهید بهشتی"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label htmlFor="password">رمز عبور *: </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={changeHandler}
              value={form.password}
            />
            {form.password.length < 8 && (
              <span className="text-xs my-1 text-error">
                *وارد کردن رمز عبور صحیح برای تغییر اطلاعات الزامی میباشد*
              </span>
            )}
          </div>
        </div>

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
