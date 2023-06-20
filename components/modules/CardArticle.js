import shortText from '@/services/shortText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CardArticle({image , shortdes , title , _id}) {
  return (
    <div className=" p-2">
      <div className="card-a">
        <div className="card-a__image">
          <Image
            src={image}
            width={700}
            height={500}
            alt="name"
          />
        </div>
        <div className="card-a__body w-full">
          <div className="card-a__title">{shortText(title, 30)}{title.length > 30 && "..."}</div>
          <div className="card-a__des">
            {shortText(shortdes, 70)}{shortdes.length > 70 && "..."}
          </div>
          <div className="card-a__buttons w-full">
            <Link href={`/articles/${_id}`} className="w-full">
              <button className="btn-sm btn-primary w-full">ادامه مطلب ... </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardArticle