import React, { useState } from 'react'


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
import { ThreeDots } from 'react-loader-spinner'


function CardProduct({ name, images, price, category, _id, description, signShow }) {

    const [loading, setLoading] = useState(false)


    


    const session = useSession()
    const router = useRouter()


    const addHandler = async (id) => {

        if (session.status === "unauthenticated") {
            signShow(true)
        } else {
            try {
                setLoading(true)
                const res = await axios.post("/api/order", {
                    productId: id
                })

                if (res.data.status === "success") {
                    Toastify("success", res.data.message)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
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
                            قیمت : <span>{newFunction(price)}</span>
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
                        <button type="button" disabled={loading} className="btn-sm btn-primary" onClick={() => addHandler(_id)}>
                            {
                                loading ?
                                    <ThreeDots
                                        height="30"
                                        width="10"
                                        radius="9"
                                        color="#fff"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    /> : "خرید"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct




function newFunction(price) {
    return price.toLocaleString()
}
