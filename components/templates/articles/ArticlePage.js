import Image from "next/image";
import React, { useState } from "react";
import parse from "html-react-parser";
import { convertToPersain } from "@/services/jalalimoment";
import CommentForm from "@/components/modules/CommentForm";
import CardComment from "@/components/modules/CardComment";
import { Zoom } from "react-reveal";
import useSWR from 'swr'



function ArticlePage({ article }) {
  const { title, shortdes, description, image, _id, createdAt } = article;



  const { data, error, isLoading } = useSWR(`/api/comment?parentid=${_id}&parenttype=article`, url => fetch(url).then(res => res.json()))



  return (
    <div>
      <div className="container mx-auto py-12 px-2">
        <div className="article-content">
          <div className="article-content__info">
            <div>نوشته شده در تاریخ : {convertToPersain(createdAt)}</div>
            <div>مدت زمان برای خواندن : 20دقیقه</div>
          </div>

          <div className="article-content__image">
            <Zoom>
              <Image src={image} width={700} height={500} alt={title} />
            </Zoom>
          </div>
          <div className="article-content__title">{title}</div>
          <div className="article-content__shortdes">{shortdes}</div>

          <div className="article-content__description ">
            {parse(description)}
          </div>
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



        <div className="mt-12">
          <div className="box-title">ارسال نظر</div>
          <CommentForm type="article" parent={_id} />
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
