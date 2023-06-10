import CardComment from "@/components/modules/CardComment";
import CommentForm from "@/components/modules/CommentForm";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

function ProductPage({ product }) {
  const { images, name, _id } = product;

  const { data, error, isLoading } = useSWR(
    `/api/comment?parentid=${_id}&parenttype=product`,
    (url) => fetch(url).then((res) => res.json())
  );



  return (
    <div>
      <div className="container mx-auto py-12">
        <div>
          <Image src={images[0].link} alt="aksldn" width={500} height={300} />
          {name}
        </div>
        {data?.data.length > 0 && (
          <>
            <div className="box-title">نظرات</div>
            <div className="comment-content">
              {data.data.map((item, index) => (
                <CardComment key={item._id} {...item} />
              ))}
            </div>
          </>
        )}


        <div className="box-title">ارسال نظر</div>
        <CommentForm parent={_id} type="product" />
      </div>
    </div>
  );
}

export default ProductPage;
