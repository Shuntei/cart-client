import React, { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LoginModal() {
  const { login } = useAuth();
  const [showAlert, setShowAlert] = useState({
    accountAlert: "",
    passwordAlert: "",
  });

  const [loginForm, setLoginForm] = useState({ account: "", password: "" });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const mySwal = withReactContent(Swal);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (true) {
      case !loginForm.account && !loginForm.password:
        setShowAlert({
          accountAlert: "請輸入帳號",
          passwordAlert: "請輸入密碼",
        });
        break;
      case !loginForm.account:
        setShowAlert({
          accountAlert: "請輸入帳號",
          passwordAlert: "",
        });
        break;
      case !loginForm.password:
        setShowAlert({
          accountAlert: "",
          passwordAlert: "請輸入密碼",
        });
        break;
      case !loginForm.password:
        setShowAlert({
          accountAlert: "",
          passwordAlert: "請輸入密碼",
        });
        break;
      case loginForm.account !== "" && loginForm.password !== "":
        setShowAlert({
          accountAlert: "",
          passwordAlert: "",
        });
        login(loginForm.account, loginForm.password).then((result) => {
          if (result) {
            const loginModal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            loginModal?.close();
            mySwal.fire({
              icon: "success",
              title: "登入成功",
              confirmButtonColor: "oklch(76.76% 0.184 183.61 / 1)",
            });
          } else {
            const loginModal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            loginModal?.close();
            mySwal.fire({
              icon: "error",
              title: "帳號或密碼錯誤",
              footer: '<a href="#">忘記密碼了嗎?</a>',
            });
          }
        });
        break;
      default:
        console.log("預期外的狀況");
        break;
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-[500px] bg-base-200">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-[26px] text-center">會員登入</h3>
          <form className="flex-col space-y-5 text-center mt-10">
            <div>
              <input
                type="text"
                placeholder="帳號"
                className="border-2 rounded-lg px-3 outline-none w-[300px] h-[50px]"
                name="account"
                onChange={changeHandler}
                value={loginForm.account}
              />
            </div>
            <span className=" text-rose-600">
              {showAlert.accountAlert}&nbsp;
            </span>
            <div>
              <input
                type="password"
                placeholder="密碼"
                className="border-2 rounded-lg px-3 outline-none w-[300px] h-[50px]"
                name="password"
                onChange={changeHandler}
                value={loginForm.password}
              />
            </div>
            <span className=" text-rose-600">
              {showAlert.passwordAlert}&nbsp;
            </span>
            <div>
              <button
                className="btn btn-accent w-[300px] h-[50px]"
                onClick={submitHandler}
              >
                Login
              </button>
            </div>
            {/* <div className="text-sm">OR</div> */}
          </form>
        </div>
      </dialog>
    </>
  );
}
