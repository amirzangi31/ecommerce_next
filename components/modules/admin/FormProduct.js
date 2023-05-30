import React, { useEffect, useState } from "react";
import Image from "next/image";
// AXIOS
import axios from "axios";
// FUNCTIONS
import uploadImageHandler from "@/services/uploadimage";
// COMPONENTS
import Button from "../Button";
// TOAST
import Toastify from "@/services/Toast";
// ICONS
import { BsFillTrashFill } from "react-icons/bs";
// SORTABLE
import { ReactSortable } from "react-sortablejs";
import { convertToPersain } from "@/services/jalalimoment";

function FormProduct({
  name,
  price,
  description,
  images,
  edit,
  _id,
  category,
  categories,
  properties,
  createdAt,
  updatedAt,
}) {
  const [form, setForm] = useState({
    name: name || "",
    price: price || "",
    description: description || "",
    images: images || [],
    category: category || "",
    properties: [],
  });

  const [productProperties, setProductProperties] = useState(properties || {});
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");

  //getall properties and filter propties this product with parent properties
  const getPropertiesCat = async () => {
    if (form.category) {
      const filterCategories = categories.filter(
        (item) => item._id === form.category
      );
      // const parentP = [...filterCategories[0].parent.properties] : []

      let pAll = filterCategories[0].parent
        ? [
          ...filterCategories[0].parent.properties,
          ...filterCategories[0].properties,
        ]
        : [...filterCategories[0].properties];

      setForm({
        ...form,
        properties: pAll,
      });
    } else {
      setForm({
        ...form,
        properties: [],
      });
    }
  };
  useEffect(() => {
    getPropertiesCat();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.category]);

  // sortable for images function
  const updateImageOrder = (images) => {
    setForm({ ...form, images });
  };

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
        images: [
          ...form.images,
          { name: image.name, link: `/images/products/${image.name}` },
        ],
      });
    }

    cancelHandler();
  };

  // delete image product
  const deleteImageHandler = (imageIndex, name) => {
    const filterImage = form.images.filter(
      (item, index) => index !== imageIndex && item.name !== name
    );
    setForm({
      ...form,
      images: filterImage,
    });
  };

  // submit handler
  const saveHandler = async () => {
    if (edit) {
      // updated
      const res = await axios.patch(`/api/products/${_id}`, {
        ...form,
        properties: productProperties,
      });
      Toastify("success", "محصول با موفقیت ویرایش شد");
    } else {
      //created
      const res = await axios.post("/api/products", {
        ...form,
        properties: productProperties,
      });
      if (res.data.status === "success") {
        Toastify("success", "محصول با موفقیت ساخته شد");
        setForm({
          name: "",
          price: "",
          description: "",
          category: "",
          images: [],
          properties: [],
        });
      }
    }
  };

  // change property for product
  const setPropertiesProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProperties = { ...prev };
      newProductProperties[propName] = value;
      return newProductProperties;
    });
  };

  return (
    <div className="form-admin">
      {createdAt &&
        <div className="flex justify-between items-center my-2">
          <div><span className="text-primary-admin dark:text-dark-primary-admin">ساخته شده در تاریخ : </span><span className="text-whiteone dark:text-dark-whiteone font-bold">{convertToPersain(createdAt)}</span></div>
          <div><span className="text-primary-admin dark:text-dark-primary-admin">بروزرسانی شده در تاریخ : </span><span className="text-whiteone dark:text-dark-whiteone font-bold">{convertToPersain(updatedAt)}</span></div>
        </div>}
      <div className="input-content">
        <div className="input-content__group">
          <label>نام محصول</label>
          <input
            type="text"
            name="name"
            onChange={changeHandler}
            value={form.name}
          />
        </div>
        <div className="input-content__group">
          <label>قیمت </label>
          <input
            type="number"
            name="price"
            onChange={changeHandler}
            value={form.price}
          />
        </div>
      </div>
      <div className="input-content">
        <div className="input-content__group">
          <label>دسته بندی </label>
          <select
            name="category"
            value={form.category}
            onChange={changeHandler}
          >
            <option value="">بدون دسته بندی</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {form.properties?.length > 0 && (
        <div>
          {form.properties.map((item) => (
            <div key={item.name} className="input-content">
              <div className="input-content__group">
                <label className="label-secondary">نام ویژگی</label>
                <input
                  type="text"
                  className="input-secondary"
                  disabled={true}
                  value={item.name}
                />
              </div>
              <div className="input-content__group">
                <label className="label-secondary">مقدار </label>

                <select
                  name="property"
                  className="input-secondary"
                  value={productProperties[item.name]}
                  onChange={(e) => setPropertiesProp(item.name, e.target.value)}
                >
                  {item.value.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
      {confirmUpload ? (
        <div className="confirm-upload">
          <p className="text-center">آیا میخواهید این عکس را اپلود کنید؟</p>
          <div className="upload-image-element mx-auto my-2 border border-primary-admin overflow-hidden">
            <img src={createObjectURL} alt="" />
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
        <div className="flex justify-start items-center my-2">
          <label htmlFor="upload" className="upload-image-element">
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
          </label>
          <input type="file" hidden id="upload" onChange={chnageImageHandler} />
          <div className="mx-4">
            {form.images.length > 0 ? (
              <div className="flex justify-start items-center gap-4">
                <ReactSortable
                  list={form.images}
                  setList={updateImageOrder}
                  className="flex justify-start flex-wrap gap-4"
                >
                  {form.images.map((item, index) => (
                    <div
                      key={index}
                      className="upload-image-element p-1 delete-image "
                    >
                      <Image
                        src={item.link}
                        alt={item.name}
                        width={700}
                        height={500}
                        className="w-full"
                      />
                      <BsFillTrashFill
                        className="border-secondary-admin dark:border-dark-secondary-admin"
                        onClick={() => deleteImageHandler(index, item.name)}
                      />
                    </div>
                  ))}
                </ReactSortable>
              </div>
            ) : (
              <div className="text-primary-admin dark:text-primary-admin font-bold">
                هیچ عکسی برای این محصول بارگذاری نکرده اید
              </div>
            )}
          </div>
        </div>
      )}

      <div className="input-content__textarea">
        <label>توضیحات </label>
        <textarea
          rows="10"
          cols="30"
          name="description"
          value={form.description}
          onChange={changeHandler}
        ></textarea>
      </div>

      <div className="flex justify-end items-center ">
        <Button className="btn-primary-admin w-24" handler={saveHandler}>
          {edit ? "ویرایش" : "افزودن"}
        </Button>
      </div>
    </div>
  );
}

export default FormProduct;
