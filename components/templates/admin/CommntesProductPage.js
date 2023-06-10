import React from "react";
import LayoutAdmin from "./LayoutAdmin";
import Image from "next/image";
import CardCommentAdmin from "@/components/modules/admin/CardCommentAdmin";


function CommntesProductPageAdmin({ product }) {
  const { images, name, comments } = product;
 

  return (
    <LayoutAdmin title="کامنت های  یک محصول">

      <div className="flex justify-between items-center text-white p-1">
        <span>
          <Image
            src={images[0].link}
            width={200}
            height={100}
            alt={name}
            className="w-12 h-12"
          />
        </span>
        <span>{name}</span>
        <span>تعداد کامنت :{comments.length}</span>
      </div>
      <div className="">
        {comments.map((comment, index) => (
          <CardCommentAdmin key={comment._id} {...comment}   />
        ))}
      </div>
    </LayoutAdmin>
  );
}

export default CommntesProductPageAdmin;
