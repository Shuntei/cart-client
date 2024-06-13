import React, { useEffect, useState } from "react";
import productsData from "./data/products-data";
import { useCartDispatch, useCartSelector } from "@/store/cart-hooks";
import { cartActions } from "@/store/cart-slice";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";

export default function Shop() {
  // const types = [
  //   { type: "全部" },
  //   { type: "男裝" },
  //   { type: "女裝" },
  //   { type: "配件" },
  //   { type: "其他" },
  // ];
  const { auth } = useAuth();
  // if (auth) console.log("shopAuth: ", auth);

  const router = useRouter();
  const [itemQty, setItemQty] = useState(productsData);

  // const cartSelector = useCartSelector((state) => state.cart.items);
  // console.log(cartSelector);
  const dispatch = useCartDispatch();

  const openModal = () => {
    const loginModal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement | null;
    loginModal?.showModal();
  };

  const addToCartHandler = (
    authId: number,
    id: string,
    price: number,
    quantity: number,
    totalPrice: number,
    description: string
  ) => {
    dispatch(
      cartActions.addItemToCart({
        authId,
        id,
        price,
        quantity,
        totalPrice,
        description,
      })
    );
  };

  const qtyPlusHandler = (id: string) => {
    const thisItem = itemQty.find((v) => v.id === id);
    if (thisItem) thisItem.quantity++;
    setItemQty([...itemQty]);
  };

  const qtyMinusHandler = (id: string) => {
    const thisItem = itemQty.find((v) => v.id === id);
    if (thisItem && thisItem.quantity > 1) thisItem.quantity--;
    setItemQty([...itemQty]);
  };

  return (
    <>
      {itemQty ? console.log(itemQty.map((v) => v)) : "沒有"}
      {/* <ul className="flex space-x-10 m-5">
        {types.map((v, i) => {
          return (
            <li key={i}>
              <button className="btn btn-sm">{v.type}</button>
            </li>
          );
        })}
      </ul> */}
      <div className="grid gap-5  m-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsData.map((v, i) => {
          return (
            <div key={v.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src="/images/women.jpg" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {`${v.id}號潮流女裝`}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{v.description}</p>
                <div className="card-actions justify-end">
                  <div className="text-red-500">&#36;{`${v.price}`}</div>
                </div>
                <div className="card-actions space-x-5 flex items-center justify-end ">
                  <div className="flex items-center">
                    <span className=" w-[70px]">數量: {v.quantity}</span>
                    <button
                      className="btn btn-sm w-10 mx-1"
                      onClick={() =>
                        auth && auth.data.id !== 0 && qtyPlusHandler(v.id)
                      }
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="btn btn-sm w-10 mx-1"
                      onClick={() =>
                        auth && auth.data.id !== 0 && qtyMinusHandler(v.id)
                      }
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-accent text-white text-lg"
                  onClick={() =>
                    auth && auth.data.id !== 0
                      ? addToCartHandler(
                          auth.data.id,
                          v.id,
                          v.price,
                          v.quantity,
                          v.quantity * v.price,
                          v.description
                        )
                      : openModal()
                  }
                >
                  加入購物車
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
