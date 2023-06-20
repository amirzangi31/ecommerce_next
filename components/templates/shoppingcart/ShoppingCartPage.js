import CardProductCart from "@/components/modules/CardProductCart";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ShoppingCartPage() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    const res = await axios("/api/order?type=noPaid");
    setCart(res.data.data);
  };

  useEffect(() => {
    fetchCart();
  }, [cart]);

  return (
    <div className="container mx-auto px-2 py-16">
      <div className="cart-content">
        <div className="cart-content_products">
          {!!cart &&
            cart.items.map((item) => (
              <CardProductCart key={item._id} {...item} cartId={cart._id} />
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
            <Link href={"/"} className="w-full">
              <button type="button" className="btn-sm btn-primary w-full">
                رفتن به صفحه پرداخت
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartPage;
