import React from 'react'


//SERVICES
import Toastify from '@/services/Toast'
import shortText from '@/services/shortText'

//AXIOS
import axios from 'axios'

//SESSION
import { useSession } from 'next-auth/react'

//NEXT COMPONENT
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'


function CardProduct({ name, images, price, category, _id, description, signShow }) {

    const session = useSession()
    const router = useRouter()


    const addHandler = async (id) => {

        if (session.status === "unauthenticated") {
            signShow(true)
        } else {
            try {
                const res = await axios.post("/api/order", {
                    productId: id
                })

                if (res.data.status === "success") {
                    Toastify("success", res.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

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
                        <button type="button" className="btn-sm btn-primary" onClick={() => addHandler(_id)}>
                            خرید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct