import React, { useEffect, useState } from 'react'

import axios from 'axios'

// import { isInCart, productCount } from '@/services/helper'
import { useSession } from 'next-auth/react'
// import { BsTrash } from 'react-icons/bs'
// import { ThreeDots } from 'react-loader-spinner'


function BtnsCardProduct({ productId, signShow }) {
    const [loadingCart, setLoadingCart] = useState(true)
    const [cart, setCart] = useState({})
    const session = useSession()


    const fetchCart = async () => {
        // setLoadingCart(true)

        const res = await axios("/api/order?type=noPaid")
        console.log(res)
        if (res.data.status === "success") {
            // setLoadingCart(false)
            setCart(res.data.data)
        }

    }


    useEffect(() => {
        fetchCart()
    }, [])




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
                    await fetchCart()
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    if (session.status === "unauthenticated") return (
        <>
            <button type="button" className="btn-sm btn-primary" onClick={() => addHandler(productId)}>
                خرید
            </button>
        </>
    )

    return (
        <>
            {/* <button type="button" onClick={() => setLoadingCart(!loadingCart)}>test</button> */}
            {console.log(Object.keys(cart).length)}
            {
                Object.keys(cart).length && <button type="button" className="btn-sm btn-primary" onClick={() => addHandler(productId)}>
                خرید
            </button>
            }
        </>
    )
}

export default BtnsCardProduct



// {
//     loadCart === false && !!isInCart(cart, _id) ?
//         <button
//             className={`btn-sm btn-primary ${loadingCount && "opacity-50"}`}
//             onClick={increaseProduct}
//             disabled={loadingCount}
//         >
//             +
//         </button>
//         :
//         showAdd && <button type="button" disabled={loading} className="btn-sm btn-primary" onClick={() => addHandler(_id)}>
//             {
//                 loadingAdd ?
//                     <ThreeDots
//                         height="30"
//                         width="10"
//                         radius="9"
//                         color="#fff"
//                         ariaLabel="three-dots-loading"
//                         wrapperStyle={{}}
//                         wrapperClassName=""
//                         visible={true}
//                     /> : "خرید"
//             }
//         </button>
// }

// {loadCart === false && !!isInCart(cart, _id) && <span className='text-text-primary'> {productCount(cart, _id)}</span>}
// {
//     loadCart === false && productCount(cart, _id) === 1 && <button
//         className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
//         type="button"
//         onClick={deleteProduct}
//         disabled={loadingCount}
//     >
//         <BsTrash className="text-xl" />
//     </button>
// }
// {/* if quantity product in shopping > 1 */}
// {
//     loadCart === false && productCount(cart, _id) > 1 && <button
//         disabled={loadingCount}
//         className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
//         onClick={decreaseProduct}

//     >
//         -
//     </button>
// }



