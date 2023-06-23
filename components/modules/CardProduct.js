import React from 'react'

//SERVICES
import shortText from '@/services/shortText'

//NEXT COMPONENT
import Image from 'next/image'
import Link from 'next/link'




function CardProduct({ name, images, price, category, _id, description, signShow }) {

    return (
        <Link href={`/products/${_id}`}>
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
                                قیمت : <span>{totalPrice(price)}</span>
                            </p>
                            <p>
                                دسته بندی : <span>{category.name}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct


function totalPrice(price) {
    return price.toLocaleString()
}
