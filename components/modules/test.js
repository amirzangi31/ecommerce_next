{/* <div className="card-p__buttons">
<Link href={`/products/${_id}`}>
    <button type="button" className="btn-sm btn-secondary">
        جزِییات
    </button>
</Link>

{session.status === "authenticated" && !Object.keys(cart).length ?
    <ThreeDots
        height="30"
        width="30"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
    /> :
    <div className='flex justify-center items-center gap-2'>

        {
            loadCart === false && !!isInCart(cart, _id) ?
                <button
                    className={`btn-sm btn-primary ${loadingCount && "opacity-50"}`}
                    onClick={increaseProduct}
                    disabled={loadingCount}
                >
                    +
                </button>
                :
                showAdd && <button type="button" disabled={loading} className="btn-sm btn-primary" onClick={() => addHandler(_id)}>
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
        }




        {loadCart === false && !!isInCart(cart, _id) && <span className='text-text-primary'> {productCount(cart, _id)}</span>}


        {
            loadCart === false && productCount(cart, _id) === 1 && <button
                className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
                type="button"
                onClick={deleteProduct}
                disabled={loadingCount}
            >
                <BsTrash className="text-xl" />
            </button>
        }



        {
            loadCart === false && productCount(cart, _id) > 1 && <button
                disabled={loadingCount}
                className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
                onClick={decreaseProduct}

            >
                -
            </button>
        }
    </div>
}

</div> */}












/*------------handlers -------------*/

// const [loading, setLoading] = useState(false)
// const [loadCart, setLoadCart] = useState(true)
// const [loadingCount, setLoadingCount] = useState(false)
// const [showAdd, setShowAdd] = useState(true)
// const [cart, setCart] = useState({})



// const session = useSession()


// const fetchCart = async () => {
//     setLoadCart(true)
//     const res = await axios("/api/order?type=noPaid");
//     setCart(res.data.data);
//     setLoadCart(false)
// };



// useEffect(() => {
//     if (session.status === "authenticated") {
//         fetchCart();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [session.status]);

// const increaseProduct = async () => {
//     setLoadingCount(true);
//     setShowAdd(false)

//     const res = await axios.patch(
//         `/api/order/${cart._id}?type=increase&&product=${_id}`
//     );
//     if (res.data.status === "success") {
//         await fetchCart()
//     }
//     setLoadingCount(false);
// };
// const decreaseProduct = async () => {
//     setLoadingCount(true);
//     setShowAdd(false)
//     const res = await axios.patch(
//         `/api/order/${cart._id}?type=decrease&&product=${_id}`
//     );
//     if (res.data.status === "success") {
//         await fetchCart()


//     }
//     setLoadingCount(false);
// };

// async function deleteProduct() {
//     setLoadingCount(true);
//     setShowAdd(true)
//     const res = await axios.patch(
//         `/api/order/${cart._id}?type=delete&&product=${_id}`
//     );
//     if (res.data.status === 'success') {
//         await fetchCart()
//     }
//     setLoadingCount(false);
// }

// const addHandler = async (id) => {

//     if (session.status === "unauthenticated") {
//         signShow(true)
//     } else {
//         try {
//             setLoading(true)
//             const res = await axios.post("/api/order", {
//                 productId: id
//             })

//             if (res.data.status === "success") {
//                 Toastify("success", res.data.message)
//                 await fetchCart()
//                 setLoading(false)
//             }
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }
// }

/*------------handlers -------------*/