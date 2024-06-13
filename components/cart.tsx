import React, { useEffect, useState } from "react";
import { cartActions } from "@/store/cart-slice";
import { useCartSelector, useCartDispatch } from "@/store/cart-hooks";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useAuth } from "@/contexts/auth-context";
import { AiTwotoneShop } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Cart() {
  const dispatch = useCartDispatch();
  const { auth } = useAuth();
  const router = useRouter();
  // console.log(auth);

  interface cartItemsType {
    authId: number;
    id: string;
    price: number;
    quantity: number;
    totalPrice: number;
    description: string;
  }
  const cartSelector = useCartSelector((state) => state.cart.items);
  const [cartItems, setCartItems] = useState<cartItemsType[]>([]);

  const addItemHandler = (
    authId: number,
    id: string,
    price: number,
    quantity: number,
    totalPrice: number,
    description: string
  ) => {
    dispatch(
      cartActions.addQtyInCart({
        // cartActions.addItemToCart({
        authId,
        id,
        price,
        quantity,
        totalPrice,
        description,
      })
    );
  };

  const removeItemHandler = (id: string, authId: number) => {
    dispatch(cartActions.removeItemFromCart({ id, authId }));
  };

  useEffect(() => {
    const storeItems = localStorage.getItem("myCart");
    if (storeItems) setCartItems(JSON.parse(storeItems));
  }, [cartSelector]);

  return (
    <>
      <nav className="flex h-[70px] bg-zinc-100 items-center relative">
        <div className="flex ms-10 me-5 space-x-2 items-center">
          <AiTwotoneShop className="text-[30px]" />
          <h2 className="text-[26px] hidden lg:block">服飾店</h2>
        </div>
        <div>|</div>
        <div className="space-x-2 mx-5 flex items-center">
          <span>購物車</span>
        </div>
        <button className="btn absolute right-10" onClick={() => router.back()}>
          回上一頁
        </button>
      </nav>
      <ul className="mb-[100px]">
        <li>
          {cartItems.length > 0 ? (
            cartItems
              ?.filter((v) => v.authId === auth.data.id)
              .map((v) => {
                return (
                  <div
                    key={v.id}
                    className="card bg-base-100 shadow-xl flex-col items-center"
                  >
                    <div className="bg-base-100 flex lg:w-[800px] my-3 rounded-lg border-2">
                      <img
                        src="/images/women.jpg"
                        alt="Shoes"
                        className="m-5 size-[150px]"
                      />
                      <div className="card-body">
                        <h2 className="card-title">
                          {`${v.id}號潮流女裝`}
                          <div className="badge badge-secondary hidden sm:block">
                            NEW
                          </div>
                        </h2>
                        <div className="badge badge-secondary sm:hidden">
                          NEW
                        </div>
                        <p>{v.description}</p>
                        <div className="card-actions sm:space-x-5 flex sm:items-center flex-col sm:flex-row justify-start">
                          <div className="">單價: &#36;{`${v.price}`}</div>
                          <div className="flex items-center">
                            <span className="w-[70px]">數量: {v.quantity}</span>
                            <span>
                              <button
                                className="btn btn-sm mx-1 my-1 sm:my-0"
                                onClick={() =>
                                  auth &&
                                  auth.data.id !== 0 &&
                                  addItemHandler(
                                    auth.data.id,
                                    v.id,
                                    v.price,
                                    v.quantity,
                                    v.quantity * v.price,
                                    v.description
                                  )
                                }
                              >
                                <FaPlus />
                              </button>
                              <button
                                className="btn btn-sm mx-1 my-1 sm:my-0"
                                onClick={() =>
                                  removeItemHandler(v.id, auth.data.id)
                                }
                              >
                                <FaMinus />
                              </button>
                            </span>
                          </div>
                          <div className="">總價: &#36;{v.totalPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-lg text-center mt-10">
              <div>購物車是空的</div>
              <button className="btn mt-3" onClick={() => router.push("/")}>
                前往購物
              </button>
            </div>
          )}
        </li>
      </ul>
      <div className="bg-zinc-100 h-[100px] leading-[100px] fixed w-full bottom-0 text-center flex justify-center items-center">
        <button className="btn btn-lg btn-accent text-[30px] text-white">
          去買單
        </button>
      </div>
    </>
  );
}
