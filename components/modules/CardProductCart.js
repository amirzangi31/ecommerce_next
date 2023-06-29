import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/redux/features/cart/cartSlice";

function CardProductCart({ product, quantity, cartId }) {
  const [loadingCount, setLoadingCount] = useState(false);

  const dispatch = useDispatch()


  const increaseProduct = async () => {
    setLoadingCount(true);
    const res = await axios.patch(
      `/api/order/${cartId}?type=increase&&product=${product._id}`
    );
    if (res.data.status === "success") {
      dispatch(fetchCart())
      setLoadingCount(false);
    }
  };
  
  const decreaseProduct = async () => {
    setLoadingCount(true);
    const res = await axios.patch(
      `/api/order/${cartId}?type=decrease&&product=${product._id}`
    );
    if (res.data.status === "success") {
      dispatch(fetchCart())
      setLoadingCount(false);
    }
  };

  async function deleteProduct() {
    setLoadingCount(true);
    const res = await axios.patch(
      `/api/order/${cartId}?type=delete&&product=${product._id}`
    );
    if (res.data.status === 'success') {
      dispatch(fetchCart())
    }
    setLoadingCount(false);
  }

  return (
    <div className="flex justify-between items-center gap-1 flex-row-reverse text-text-primary my-2">
      <div>
        <Image src={product.images[0].link} width={50} height={50} alt="test" />
      </div>
      <div className="w-3/12 text-center">{product.name}</div>
      <div className="w-3/12  flex  justify-center items-center ">
        <button
          className={`btn-sm btn-primary ${loadingCount && "opacity-50"}`}
          onClick={increaseProduct}
          disabled={loadingCount}
        >
          +
        </button>
        <span className="mx-2">
          {loadingCount === true ? (
            <Loader width="20" height="20" color="#fff" />
          ) : (
            quantity
          )}
        </span>
        {quantity === 1 ? (
          <button
            className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
            type="button"
            onClick={deleteProduct}
            disabled={loadingCount}
          >
            <BsTrash className="text-xl" />
          </button>
        ) : (
          <button
            disabled={loadingCount}
            className={`btn-sm btn-error ${loadingCount && "opacity-50"}`}
            onClick={decreaseProduct}

          >
            -
          </button>
        )}
      </div>
      <div className="w-3/12 text-center">
        {(product.price * quantity).toLocaleString()} ريال
      </div>
    </div>
  );
}

export default CardProductCart;
