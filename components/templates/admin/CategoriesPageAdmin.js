import React, { useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import Button from "@/components/modules/Button";
import axios from "axios";
import Toastify from "@/services/Toast";
import TableCategoryAdmin from "@/components/modules/admin/TableCategoryAdmin";
import { useRouter } from "next/router";
import uploadImageHandler from "@/services/uploadimage";
import Image from "next/image";
import Loader from "@/components/modules/admin/Loader";

function CategoriesPageAdmin({ categories }) {
  const [edited, setEdited] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false)
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",

    brands: [],
    image: "",
  });





  // submit handler
  const addCategory = async () => {
    const data = {
      name: form.name,
      brands: form.brands.map((item) => {
        return { name: item.name };
      }),
      image: form.image
    };

    if (!edited) {
      //created
      const res = await axios.post("/api/categories", data);

      if (res.data.status === "success") {
        Toastify("success", "دسته بندی با موفقیت ساخته شد");
        setForm({
          name: "",
          brands: [],
          image : ""
        });
        router.reload();
      }
    } else {
      // updated
      const res = await axios.patch(`/api/categories/${categoryId}`, data);

      if (res.data.status === "success") {
        Toastify("success", "دسته بندی با موفقیت ویرایش شد");
        setForm({
          name: "",
          brands: [],
          image : ""
        });
        router.reload();
      }
    }
  };



  // add property row
  const addProperty = () => {
    setForm({
      ...form,
      brands: [...form.brands, { name: ""}],
    });
  };


  // delete property row
  const deleteProperty = (itemIndex) => {
    const filterProperty = form.brands.filter(
      (item, pIndex) => pIndex !== itemIndex
    );

    setForm({
      ...form,
      brands: filterProperty,
    });
  };


  // chnage propery(name , value)
  const changeNameProperty = (indexToChange, value) => {
    const brands = form.brands;
    brands[indexToChange].name = value;

    setForm({
      ...form,
      brands: [...brands],
    });
  };


  // active edited
  const editedCategory = (category) => {
    const { name, brands, image } = category;

    setCategoryId(category._id);
    setEdited(true);
    setForm({
      name,
      brands: brands.map((item) => ({
        name: item.name,
      })),
      image
    });
  };

  // inactive edited
  const closeEdited = () => {
    setEdited(false);
    setForm({
      name: "",
      brands: [],
      image: ""
    });
  };

  // change handlers
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const chnageImageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }

    setConfirmUpload(true);
  };

  // cancel upload image
  const cancelHandler = () => {
    setConfirmUpload(false);
    setImage("");
    setCreateObjectURL("");
  };



  //upload image in cloudinary
  const uploadImage = async () => {
    setUploadLoading(true)
    const formData = new FormData()
    formData.append("file", image);
    formData.append("upload_preset", "adminEcommerce");

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dglh3bbsp/image/upload', {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.secure_url) {
        setForm({
          ...form,
          image: data.secure_url
        });
      }


      setUploadLoading(false)
      cancelHandler();
    } catch (error) {
      console.log(error)
      setUploadLoading(false)
    }

  };



  return (
    <LayoutAdmin title="دسته بندی ها">
      <div className="form-admin">
        {confirmUpload ? (
          <div className="confirm-upload">
            <p className="text-center">آیا میخواهید این عکس را اپلود کنید؟</p>
            <div className="upload-image-element mx-auto my-2 border border-primary-admin overflow-hidden">
              <Image src={createObjectURL} alt="asdf" width={500} height={300} />
            </div>
            <div className="center gap-4">
              {
                uploadLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Button handler={cancelHandler} className="btn-error-admin">
                      خیر
                    </Button>
                    <Button handler={uploadImage} className="btn-primary-admin">
                      بله
                    </Button>
                  </>
                )
              }


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
            <input
              type="file"
              id="upload"
              hidden
              onChange={chnageImageHandler}
            />
          </div>
        )}

        <div className="input-content">
          <div className="input-content__group">
            <label htmlFor="name">نام دسته بندی</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="input-content my-2">
          <div className="input-content__group">
            <Button className="btn-secondary-admin" handler={addProperty}>
              اضافه کردن برند
            </Button>
          </div>
        </div>

        {form.brands.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full my-1 gap-2"
          >
            <div className="w-full">
              <label htmlFor="">نام</label>
              <input
                type="text"
                placeholder="asus"
                value={item.name}
                onChange={(e) => changeNameProperty(index, e.target.value)}
              />
            </div>

            <div className="flex justify-center items-end h-full mt-auto">
              <Button
                className="btn-error-admin my-1"
                handler={() => deleteProperty(index)}
              >
                ×
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center gap-4">
          {edited && (
            <Button className="btn-error-admin" handler={closeEdited}>
              انصراف
            </Button>
          )}
          <Button className="btn-primary-admin" handler={addCategory}>
            {edited ? "ویرایش" : "افزودن دسته بندی"}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <TableCategoryAdmin
          categories={categories}
          editedCategory={editedCategory}
        />
      </div>
    </LayoutAdmin>
  );
}

export default CategoriesPageAdmin;
