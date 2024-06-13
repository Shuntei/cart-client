import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { AiTwotoneShop } from "react-icons/ai";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const router = useRouter();

  // if (auth) console.log("navbarAuth: ", auth);
  // if (auth) console.log("navbarAuthSuccess: ", auth.success);
  // console.log(!!auth && auth.success);
  // console.log(!!auth);

  const openModal = () => {
    const loginModal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement | null;
    loginModal?.showModal();
  };

  const logoutHandler = () => {
    logout();
    router.reload();
  };

  return (
    <>
      <nav className="flex h-[70px] bg-zinc-100 items-center">
        <div className="flex ms-10 me-5 space-x-2 items-center">
          <AiTwotoneShop className="text-[30px]" />
          <h2 className="text-[26px] hidden lg:block">服飾店</h2>
        </div>
        <div>|</div>
        <div className="space-x-2 mx-5 flex items-center">
          <CiMenuBurger className="size-[20px] lg:hidden" />
          <span className="hidden lg:block">品牌故事</span>
          <span className="hidden lg:block">門市資訊</span>
          <span className="hidden lg:block">最新消息</span>
        </div>
        <div className="flex-grow justify-center">
          <span className="flex items-center  justify-center h-[48px]">
            <span className="bg-white h-full flex items-center px-3 rounded-l-xl">
              <MdOutlineSearch className="text-[20px]" />
            </span>
            <input
              className="w-[40%] h-full outline-none rounded-e-xl"
              type="text"
              placeholder=""
            />
          </span>
        </div>
        <div className="sm:flex items-center space-x-5 me-10 hidden">
          {!!auth && auth.success ? (
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <button className="btn" onClick={openModal}>
              Login
            </button>
          )}
          <button
            className="btn"
            onClick={
              !!auth && auth.success
                ? () => router.push("/member-center")
                : openModal
            }
          >
            <IoPersonCircleOutline className="size-[20px]" />
          </button>
          <button
            className="btn"
            onClick={
              !!auth && auth.success
                ? () => router.push("/cart-page")
                : openModal
            }
          >
            <MdOutlineShoppingCart className="size-[20px]" />
          </button>
        </div>
        <CiMenuBurger className="size-[20px] mx-5 sm:hidden" />
      </nav>
    </>
  );
}
