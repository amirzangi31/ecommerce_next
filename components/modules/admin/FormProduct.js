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
import { baseurl } from "@/lib/baseurl";
import Editor from "../Editor/Editor";

function FormProduct({
  name,
  price,
  description,
  images,
  edit,
  _id,
  category,
  brand,
  categories,
  createdAt,
  updatedAt,
  shortDes,
  properties
}) {
  const [form, setForm] = useState({
    name: name || "",
    price: price || "",
    description: description || "",
    images: images || [],
    category: category?._id || "",
    brand: brand || "",
    shortDes: shortDes || "",
    properties: properties || [],
  });

  const [confirmUpload, setConfirmUpload] = useState(false);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [brands, setBrands] = useState(category?.brands || []);

  //descritpion for editor
  const desHandler = (text) => {
    setForm({
      ...form,
      description: text,
    });
  };

  //activate brands input select
  const changeHandlerCategory = (e) => {
    if (e.target.value === "") {
      setBrands([]);
    }

    setForm({
      ...form,
      category: e.target.value,
    });

    const filterCategory = categories.find(
      (item) => item._id === e.target.value
    );

    if (filterCategory) {
      setBrands(filterCategory.brands);
    }
    return;
  };

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
    // const uploadImage = await uploadImageHandler(image, "/api/uploadimage");
    setUploadLoading(true);
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
        images: [...form.images, { name: image.name, link: data.secure_url }],
      });
    }

    setUploadLoading(false);
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
      const res = await axios.patch(`/api/products/${_id}`, form);
      Toastify("success", "محصول با موفقیت ویرایش شد");
    } else {
      //created
      const res = await axios.post("/api/products", form);

      if (res.data.status === "success") {
        Toastify("success", "محصول با موفقیت ساخته شد");
        setForm({
          name: "",
          price: "",
          description: "",
          category: "",
          images: [],
          brand: "",
        });
      }
    }
  };

  //for add property and deleteproperty and changevalueproperty
  const addProperty = () => {
    const property = { name: "", value: "" };

    setForm({
      ...form,
      properties: [...form.properties, property],
    });
  };

  const changeHandlerPropertyName = (e, index) => {
    const properties = [...form.properties]
    properties[index].name = e.target.value
    setForm({
      ...form ,
      properties 
    })
  };

  const changeHandlerPropertyValue = (e, index) => {
    const properties = [...form.properties]
    properties[index].value = e.target.value
    setForm({
      ...form ,
      properties 
    })
    
  };

  const deleteProperty = (indexP) => {

    const filterProperties = form.properties.filter((item , index) => index !== indexP)

    setForm({
      ...form,
      properties : [...filterProperties]
    })
    
  }




  return (
    <div className="form-admin">
      {createdAt && (
        <div className="flex justify-between items-center my-2">
          <div>
            <span className="text-primary-admin dark:text-dark-primary-admin">
              ساخته شده در تاریخ :{" "}
            </span>
            <span className="text-whiteone dark:text-dark-whiteone font-bold">
              {convertToPersain(createdAt)}
            </span>
          </div>
          <div>
            <span className="text-primary-admin dark:text-dark-primary-admin">
              بروزرسانی شده در تاریخ :{" "}
            </span>
            <span className="text-whiteone dark:text-dark-whiteone font-bold">
              {convertToPersain(updatedAt)}
            </span>
          </div>
        </div>
      )}
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
            onChange={changeHandlerCategory}
          >
            <option value="">بدون دسته بندی</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {brands.length > 0 && (
          <div className="input-content__group">
            <label>برند :</label>
            <select name="brand" value={form.brand} onChange={changeHandler}>
              <option value="">لطفا برند را انتخاب کنید</option>
              {brands.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* properties */}
      <div className="my-2">
        <button
          type="button"
          onClick={addProperty}
          className="btn-primary-admin w-6/12 mx-auto"
        >
          اضافه کردن ویژگی
        </button>

        <div className="input-content">
          {form.properties.length > 0 &&
            form.properties.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-1 flex-1">
                  <input
                    type="text"
                    onChange={(e) => changeHandlerPropertyName(e, index)}
                    value={form.properties[index].name}
                    placeholder="نام ویژگی"
                    className="input-property-admin"
                  />
                  <input
                    type="text"
                    onChange={(e) => changeHandlerPropertyValue(e, index)}
                    value={form.properties[index].value}
                    placeholder="مقدار ویژگی"
                    className="input-property-admin"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => deleteProperty(index)}
                  className="bg-error text-white rounded-lg p-1 mx-1"
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      </div>
      {/* properties */}

      {confirmUpload ? (
        <div className="confirm-upload">
          <p className="text-center">آیا میخواهید این عکس را اپلود کنید؟</p>
          <div className="upload-image-element mx-auto my-2 border border-primary-admin overflow-hidden">
            <Image src={createObjectURL} alt="dsaf" width={500} height={300} />
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
        <label>توضیحات کوتاه </label>
        <textarea
          rows="5"
          cols="30"
          name="shortDes"
          value={form.shortDes}
          onChange={changeHandler}
        ></textarea>
      </div>

      <div className="input-content__textarea">
        <label>توضیحات </label>
        <div className="editor">
          <Editor desHandler={desHandler} value={form.description} />
        </div>
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
