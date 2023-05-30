import React, { useState } from "react";
import Button from "../Button";
import Image from "next/image";
import uploadImageHandler from "@/services/uploadimage";
import Editor from "../Editor/Editor";

import axios from "axios";
import Toastify from "@/services/Toast";
import { useRouter } from "next/router";
import { convertToPersain } from "@/services/jalalimoment";

function FormArtcile({ author, article, edited }) {

  const [form, setForm] = useState({
    title: article?.title || "",
    description: article?.description || "",
    image: article?.image || "",
    author: author,
    shortdes: article?.shortdes || ""
  });
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [confirmUpload, setConfirmUpload] = useState(false);

  const router = useRouter()



  // handlers for change inputs
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

  // cancel upload image
  const cancelHandler = () => {
    setConfirmUpload(false);
    setImage("");
    setCreateObjectURL("");
  };

  //upload image in local
  const uploadImage = async () => {
    const uploadImage = await uploadImageHandler(image, "/api/uploadimage");
    if (uploadImage.status === 200) {
      setForm({
        ...form,
        image: `/images/products/${image.name}`,
      });
    }

    cancelHandler();
  };


  const desHandler = (text) => {

    setForm({
      ...form,
      description: text
    })

  }

  const addHandler = async () => {

    if (!edited) {
      //created
      const res = await axios.post("/api/article", form)
      if (res.data.status === "success") {
        Toastify("success", "مقاله با موفقیت ساخته شد")
        setForm({
          title: "",
          description: "",
          image: "",
          author: author,
          shortdes: ""
        })
        router.push('/admin/articles')

      }
    } else {
      //updated
      const res = await axios.patch(`/api/article/${article._id}`, form)
      if (res.data.status === "success") {
        Toastify("success", "مقاله با موفقیت ویرایش شد")
        router.push('/admin/articles')
      }
    }


  }




  return (
    <div className="form-admin">
      {article?.createdAt &&
        <div className="flex justify-between items-center my-2">
          <div><span className="text-primary-admin dark:text-dark-primary-admin">ساخته شده در تاریخ : </span><span className="text-whiteone dark:text-dark-whiteone font-bold">{convertToPersain(article?.createdAt)}</span></div>
          <div><span className="text-primary-admin dark:text-dark-primary-admin">بروزرسانی شده در تاریخ : </span><span className="text-whiteone dark:text-dark-whiteone font-bold">{convertToPersain(article?.updatedAt)}</span></div>
        </div>}
      {confirmUpload ? (
        <div className="confirm-upload">
          <p className="text-center">آیا میخواهید این عکس را اپلود کنید؟</p>
          <div className="upload-image-element mx-auto my-2 border border-primary-admin overflow-hidden">
            <Image src={createObjectURL} alt="adf" width={700} height={500} />
          </div>
          <div className="center gap-4">
            <Button handler={cancelHandler} className="btn-error-admin">
              خیر
            </Button>
            <Button handler={uploadImage} className="btn-primary-admin">
              بله
            </Button>
          </div>
        </div>
      ) : (
        <div className="center my-3">
          <label htmlFor="upload" className="upload-image-element">
            {form.image ? (
              <Image src={form.image} alt="image" width={700} height={500} />
            ) : (
              <>
                <span className="text-xs">بارگذاری عکس</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </>
            )}
          </label>
          <input type="file" id="upload" hidden onChange={chnageImageHandler} />
        </div>
      )}
      <div className="input-content_textarea">
        <label htmlFor="title">نام مقاله</label>
        <input
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={changeHandler}
        />
      </div>
      <div className="input-content_textarea">
        <label htmlFor="shortdes">توضیحات کوتاه</label>

        <textarea
          rows={5}
          cols={20}
          name="shortdes"
          id="shortdes"
          value={form.shortdes}
          onChange={changeHandler}
        >

        </textarea>
      </div>

      <label >متن مقاله </label>
      <div className="editor">
        <Editor desHandler={desHandler} value={form.description} />
      </div>



      <div className="flex justify-end items-center">
        <Button className="btn-primary-admin" handler={addHandler}>
          {edited ? "ویرایش" : "افزودن"}
        </Button>
      </div>
    </div>
  );
}

export default FormArtcile;
