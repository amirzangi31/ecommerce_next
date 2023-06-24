import CardProductCart from "@/components/modules/CardProductCart";
import Modal from "@/components/modules/modal/Modal";
import Toastify from "@/services/Toast";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

function ShoppingCartPage() {
  const [cart, setCart] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalNoCart, setModalNoCart] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [isPay, setIsPay] = useState(false);

  const {
    user: { user },
    loading,
    error,
  } = useSelector((state) => state.user);

  const payHandler = async () => {
    try {
      const res = await axios.patch(`/api/order/${cart._id}?type=payment`);
      if (res.data.status === "success") {
        Toastify("success", "سبد خرید شما با موفقیت خریداری شد");
        setModalPayment(false);
        setIsPay(true);
      }
    } catch (error) {
      Toastify("error", "سبد خرید مورد نیاز یافت نشد");
    }
  };

  const modalPaymentHnadler = () => {
    if (!!user && user.isComplete) {
      setModalPayment(true);
    } else {
      setModal(true);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios("/api/order?type=noPaid");
      setCart(res.data.data);
    } catch (error) {
      setModalNoCart(true);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cart]);



  if (isPay)
    return (
      <div className="container px-2 mx-auto py-16">
        <p className="text-3xl text-bg-primary my-4 text-center">
          سبد خرید با موفقیت پرداخت شد
        </p>
        <div className="flex justify-center items-center gap-2">
          <Link href={"/products"}>
            <button type="button" className="btn-sm btn-primary">
              سفارش محصول
            </button>
          </Link>

          <Link href={"/products"}>
            <button type="button" className="btn-sm btn-secondary">
              پیگیری سفارشات
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-2 py-16">
      <Modal show={modalNoCart} setShow={setModalNoCart}>
        <div className="flex justify-start items-center flex-col text-text-primary bg-bg-three p-3 rounded-lg border border-text-secondary w-full text-center">
          <p className="text-2xl ">سلام {!loading && user.name}</p>
          <p className="text-xl my-2">
            ممنونیم از شما که سایت ما را انتخاب کرده اید
          </p>
          <p className="text-xl my-2 text-error font-bold">
            *شما هیچ سبد خرید فعالی برای نمایش ندارید *
          </p>
          <p className="text-xl my-2">
            پیشنهاد ما این است که از محصول ما دیدن کنید
          </p>
          <div className="flex justify-center items-center gap-2 w-full mt-4">
            <Link href={"/products"}>
              <button type="button" className="btn-sm btn-primary">
                دیدن محصولات
              </button>
            </Link>
            <Link href={"/"}>
              <button type="button" className="btn-sm btn-primary">
                خانه
              </button>
            </Link>
          </div>
        </div>
      </Modal>

      <Modal show={modalPayment} setShow={setModalPayment}>
        <div className="bg-bg-three rounded-lg border border-text-secondary p-2">
          <p className="text-xl text-center text-text-primary">
            ممنونیم از اعتماد شما{" "}
          </p>
          <p className="my-4 text-text-primary text-center">
            اطلاعات شما برای ارسال محصول در صورت تایید بروی گزینه پرداخت نهایی
            کلیک کند در غیر اینصورت با رفتن به بخش ویرایش پروفایل میتواند
            اطلاعات خود را تغییر بدهید
          </p>

          <div className="form ">
            <div className="form__group">
              <div className="my-2">
                <label>نام ونام خانوداگی</label>
                <p className="text-text-primary  w-full">{user?.name}</p>
              </div>
              <div className="my-2">
                <label> شماره تماس</label>
                <p className="text-text-primary  w-full">{user?.phone}</p>
              </div>
              <div className="my-2">
                <label>آدرس</label>
                <p className="text-text-primary  w-full">{user?.address}</p>
              </div>
              <div className="my-2">
                <label>کد پستی</label>
                <p className="text-text-primary  w-full">{user?.postalcode}</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <Link href={"/dashboard/profile"}>
                <button type="button" className="btn-sm btn-secondary">
                  ویرایش پروفایل
                </button>
              </Link>
              <button
                type="button"
                className="btn-sm btn-primary"
                onClick={payHandler}
              >
                پرداخت نهایی
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {!!cart ? (
        cart.items.length > 0 ? (
          <>
            <Modal show={modal} setShow={setModal}>
              <div className="bg-bg-three text-white p-2 rounded-lg border border-text-secondary">
                <div>
                  <span className="text-2xl block text-error">توجه !</span>
                  <p className="my-2 text-center">
                    شما هنوز پروفایل خود را کامل نکرده اید برای پرداخت لطفا
                    پروفایل خود را تکمیل کنید
                  </p>
                  <p className="my-2 text-center">
                    لطفا با دقت اطلاعات پروفایل را تکمیل کنید زیرا محصولات شما
                    به این اطلاعات فرستاده میشوند
                  </p>
                  <div className="my-2 flex justify-center items-center gap-2 flex-row-reverse">
                    <Link href={"/dashboard/profile"}>
                      <button type="button" className="btn-sm btn-primary">
                        تکمیل پروفایل
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn-sm btn-error"
                      onClick={() => setModal(false)}
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="cart-content">
              <div className="cart-content_products">
                {!!cart &&
                  cart.items.map((item) => (
                    <CardProductCart
                      key={item._id}
                      {...item}
                      cartId={cart._id}
                      fetchCart={fetchCart}
                    />
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
                        cart.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
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

                  <button
                    disabled={loading}
                    type="button"
                    className={`btn-sm btn-primary w-full ${loading && "opacity-50"
                      }`}
                    onClick={modalPaymentHnadler}
                  >
                    پرداخت
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center flex-col gap-4">
            <p className="text-3xl text-error text-center">
              سبد خرید شما خالی است
            </p>
            <p className="text-2xl my-2  text-center">
              برای سفارش محصول میتوانید به صفحه محصولات بروید
            </p>
            <div className="flex justify-center items-center my-2 w-full">
              <Link href={"/products"}>
                <button type="button" className="btn-sm btn-primary">
                  رفتن به صفحه محصولات
                </button>
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center">
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
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;
