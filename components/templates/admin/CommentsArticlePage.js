import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import CardCommentAdmin from '@/components/modules/admin/CardCommentAdmin'
import Image from 'next/image'
import axios from 'axios'

function CommentsArticlePageAdmin({article}) {
  const{image , title , comments , _id} = article
  

  return (
    <LayoutAdmin title="کامنت های  یک محصول">
      <div className="flex justify-between items-center text-white p-1">
        <span>
          <Image
            src={image}
            width={200}
            height={100}
            alt={title}
            className="w-12 h-12"
          />
        </span>
        <span>{title}</span>
        <span>تعداد کامنت :{comments.length}</span>
      </div>
      <div className="">
        {comments.map((comment, index) => (
          <CardCommentAdmin key={comment._id} {...comment} parent={_id} />
        ))}
      </div>
    </LayoutAdmin>
  )
}

export default CommentsArticlePageAdmin