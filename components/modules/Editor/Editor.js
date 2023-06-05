import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import MenuBarEditor from "./MenuBarEditor";
import Modal from "../modal/Modal";
import ImageModalEditor from "./ImageModalEditor";
import Button from "../Button";
import uploadImageHandler from "@/services/uploadimage";
import { baseurl } from "@/lib/baseurl";

const Editor = ({ desHandler , value }) => {

  const [loadingUpload, setLoadingUpload] = useState(false)



  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState("")
  const [imageUrl, setImageUrl] = useState("")



  const changeImageHandler = async (e) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setLoadingUpload(true)
      

      const formData = new FormData()
      formData.append("file", i);
      formData.append("upload_preset", "adminEcommerce");
  
  
      const res = await fetch('https://api.cloudinary.com/v1_1/dglh3bbsp/image/upload', {
        method: "POST",
        body: formData
      })
      const data = await res.json()


      if (data.secure_url) {
        setLoadingUpload(false)
        setImageUrl(data.secure_url);
        setImage(i)
        setShowModal(true);
      }

    }
  };

  const showImageEditor = async () => {
    if (image.name) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
        })
        .run();

      setShowModal(false)

    }
  };


  const closeModal = () => {
    setShowModal(false)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: () => {
      const html = editor.getHTML();
      desHandler(html)
    }
  })

  return (
    <>
      <Modal show={showModal} setShow={setShowModal} >
        <div className="text-whiteone dark:text-whtieone py-2 text-center text-xl font-bold" >
          <p>آیا میخواهید این عکس را به مقاله اضافه کنید ؟؟</p>
        </div>
        <div className="rounded-lg overflow-hidden  w-6/12 mx-auto">
          {imageUrl && <ImageModalEditor imageUrl={imageUrl} alt={imageUrl} className="w-full" />}
        </div>
        <div className="flex justify-center items-center gap-2 py-2">
          <Button className="btn-error-admin" handler={closeModal}>خیر</Button>
          <Button className="btn-primary-admin" handler={showImageEditor} >بله</Button>
        </div>
      </Modal>
      <MenuBarEditor editor={editor} loading={loadingUpload} changeImageHandler={changeImageHandler} />
      <EditorContent editor={editor} />
    </>
  )
}

export default Editor