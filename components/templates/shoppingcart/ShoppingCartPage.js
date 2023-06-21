import CardProductCart from "@/components/modules/CardProductCart";
import Modal from "@/components/modules/modal/Modal";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

function ShoppingCartPage() {
  const [cart, setCart] = useState(null);

  const { user: { user }, loading, error } = useSelector(state => state.user)

  const [modal, setModal] = useState(false)




  const payHandler = () => {
    if (!!user && user.isComplete) {
      console.log("first")
    } else {
      setModal(true)
    }
  }


  const fetchCart = async () => {
    const res = await axios("/api/order?type=noPaid");
    setCart(res.data.data);
  };




  useEffect(() => {
    
    fetchCart();
  }, []);




  return (
    <div className="container mx-auto px-2 py-16">
      {!!cart ?
        cart.items.length > 0 ?
          <>
            <Modal show={modal} setShow={setModal}>
              <div className="bg-bg-three text-white p-2 rounded-lg border border-text-secondary">
                <div>
                  <span className="text-2xl block text-error">توجه !</span>
                  <p className="my-2 text-center">شما هنوز پروفایل خود را کامل نکرده اید برای پرداخت لطفا پروفایل خود را تکمیل کنید</p>
                  <p className="my-2 text-center">لطفا با دقت اطلاعات پروفایل را تکمیل کنید زیرا محصولات شما به این اطلاعات فرستاده میشوند</p>
                  <div className="my-2 flex justify-center items-center gap-2 flex-row-reverse">
                    <Link href={'/dashboard/profile'}>
                      <button type="button" className="btn-sm btn-primary">تکمیل پروفایل</button>
                    </Link>
                    <button type="button" className="btn-sm btn-error" onClick={() => setModal(false)}>انصراف</button>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="cart-content">
              <div className="cart-content_products">
                {!!cart &&
                  cart.items.map((item) => (
                    <CardProductCart key={item._id} {...item} cartId={cart._id} fetchCart={fetchCart}/>
                  ))}
              </div>
              <div className="cart-content_payment">
                <p className="text-xl font-bold text-center border-b py-2">
                  تسویه حساب{" "}
                </p>
                <div className="my-2">
                  <p className="my-2">
                    تعداد کل محصولات :{" "}
                    <span className="text-bg-primary">
                      {!!cart &&
                        cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </p>
                  <p className="my-2">
                    قیمت کل :{" "}
                    <span className="text-bg-primary">
                      {!!cart && cart.totalPrice.toLocaleString()}

                    </span>
                  </p>
                  <p className="my-2">
                    {" "}
                    هزینه ارسال : <span className="text-bg-primary"></span>
                  </p>

                  <button disabled={loading} type="button" className={`btn-sm btn-primary w-full ${loading && "opacity-50"}`} onClick={payHandler}>
                    پرداخت
                  </button>

                </div>
              </div>
            </div>
          </> : <p className="text-3xl text-error text-center">سبد خرید شما خالی است</p>
        : <div className="flex justify-center items-center">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>}




    </div>
  );
}

export default ShoppingCartPage;
