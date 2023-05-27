import React, { useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import Button from "@/components/modules/Button";
import axios from "axios";
import Toastify from "@/services/Toast";
import TableCategoryAdmin from "@/components/modules/admin/TableCategoryAdmin";
import { useRouter } from "next/router";
import uploadImageHandler from "@/services/uploadimage";
import Image from "next/image";

function CategoriesPageAdmin({ categories }) {
  const [edited, setEdited] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [confirmUpload, setConfirmUpload] = useState(false);

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    parent: "",
    properties: [],
    image: "",
  });

 



  // submit handler
  const addCategory = async () => {
    const data = {
      name: form.name,
      parent: form.parent,
      properties: form.properties.map((item) => {
        return { name: item.name, value: item.value.split("-") };
      }),
      image : form.image
    };
    if (!edited) {
      //created
      const res = await axios.post("/api/categories", data);

      if (res.data.status === "success") {
        Toastify("success", "دسته بندی با موفقیت ساخته شد");
        setForm({
          name: "",
          parent: "",
          properties: [],
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
          parent: "",
          properties: [],
        });
        router.reload();
      }
    }
  };



  // add property row
  const addProperty = () => {
    setForm({
      ...form,
      properties: [...form.properties, { name: "", value: "" }],
    });
  };


  // delete property row
  const deleteProperty = (itemIndex) => {
    const filterProperty = form.properties.filter(
      (item, pIndex) => pIndex !== itemIndex
    );

    setForm({
      ...form,
      properties: filterProperty,
    });
  };


  // chnage propery(name , value)
  const changeNameProperty = (indexToChange, value) => {
    const properties = form.properties;
    properties[indexToChange].name = value;

    setForm({
      ...form,
      properties: [...properties],
    });
  };
  const changeValueProperty = (indexToChange, value) => {
    const properties = form.properties;
    properties[indexToChange].value = value;

    setForm({
      ...form,
      properties: [...properties],
    });
  };



  // active edited
  const editedCategory = (category) => {
    const { name, parent, properties , image } = category;

    setCategoryId(category._id);
    setEdited(true);
    setForm({
      name,
      parent: parent?._id,
      properties: properties.map((item) => ({
        name: item.name,
        value: item.value.join("-"),
      })),
      image : category.image
    });
  };

  // inactive edited
  const closeEdited = () => {
    setEdited(false);
    setForm({
      name: "",
      parent: "",
      properties: [],
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



  return (
    <LayoutAdmin title="دسته بندی ها">
      <div className="form-admin">
        {confirmUpload ? (
          <div className="confirm-upload">
            <p className="text-center">آیا میخواهید این عکس را اپلود کنید؟</p>
            <div className="upload-image-element mx-auto my-2 border border-primary-admin overflow-hidden">
              <img src={createObjectURL} alt="" />
            </div>
            <div className="center gap-4">
              <Button handler={cancelHandler} className="btn-error">
                خیر
              </Button>
              <Button handler={uploadImage} className="btn-primary">
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
          <div className="input-content__group">
            <label htmlFor="parent">والد</label>
            <select
              name="parent"
              id="parent"
              value={form.parent}
              onChange={changeHandler}
            >
              <option value="">بدون والد</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-content my-2">
          <div className="input-content__group">
            <Button className="btn-secondary" handler={addProperty}>
              اضافه کردن ویژگی
            </Button>
          </div>
        </div>

        {form.properties.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full my-1 gap-2"
          >
            <div className="w-full">
              <label htmlFor="">نام</label>
              <input
                type="text"
                placeholder="برای مثال(رنگ)"
                value={item.name}
                onChange={(e) => changeNameProperty(index, e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="">مقدار</label>
              <input
                type="text"
                placeholder="برای مثال (قرمز , ابی)"
                value={item.value}
                onChange={(e) => changeValueProperty(index, e.target.value)}
              />
            </div>
            <div className="flex justify-center items-end h-full mt-auto">
              <Button
                className="btn-error my-1"
                handler={() => deleteProperty(index)}
              >
                ×
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center gap-4">
          {edited && (
            <Button className="btn-error" handler={closeEdited}>
              انصراف
            </Button>
          )}
          <Button className="btn-primary" handler={addCategory}>
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
