import shortText from '@/services/shortText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CardProduct({name , images  ,price , category , _id , description}) {
    return (
        <div className=" p-2" >
            <div className="card-p">
                <div className="card-p__image">
                    <Image
                        src={images[0].link}
                        width={700}
                        height={500}
                        alt="name"
                    />
                </div>
                <div className="card-p__body">
                    <div className="card-p__title">{name}</div>
                    <div className="card-p__des">
                        {shortText(description, 70)}{description.length > 70 && "..."}
                    </div>
                    <div className="card-p__price">
                        <p>
                            قیمت : <span>${price.toLocaleString()}</span>
                        </p>
                        <p>
                            دسته بندی : <span>{category.name}</span>
                        </p>
                    </div>
                    <div className="card-p__buttons">
                        <Link href={`/products/${_id}`}>
                            <button type="button" className="btn-sm btn-secondary">
                                جزِییات
                            </button>
                        </Link>
                        <button type="button" className="btn-sm btn-primary">
                            خرید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct