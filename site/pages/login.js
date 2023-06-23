import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import MyHead from "@/components/MyHead";

export default function Login() {
const router = useRouter()
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading,setIsLoading] = useState(false)
  // NOTE handlelogin
  const handleLogin = (e) => {
    setIsLoading(true)
    e.preventDefault();
    // backend part
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`,{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...info
        }),
      }).then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          localStorage.setItem("LinkTreeToken", data.token);
          router.push("/dashboard");
          setIsLoading(false)
        }
        if (data.status === "error") {
          toast.error("Sai email hoặc mật khẩu!");
          setIsLoading(false);
        }
      }).catch(err=> setIsLoading(false))
  };

  return (
    <>
     <MyHead
        title="Đăng nhập"
        description="Đăng nhập tạo linktree của bản thân"
        image="https://www.gosite.com/hubfs/GoSite_LinkTreeExamples.png"
        url="https://linktree-crllnkhoa.vercel.app/"
      />
      <section className="">
        <div
          className={
            styles.background +
            " main min-h-screen flex justify-center items-center bg-slate-100"
          }
        >
          <div className="content form border-2 bg-white px-4 py-6 shadow-md rounded-lg">
            <div className="flex flex-col pb-5 justify-center items-center">
              <h1 className="text-2xl font-bold text-black text-center">
                Chào mừng bạn trở lại
              </h1>
              <p>Cập nhật thêm chia sẻ các liên kết của bạn</p>
            </div>
            <div className="">
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <span className="flex flex-row border-1 px-4 border-gray-100 bg-white text-black shadow-lg p-2 rounded-lg">
                  <img className="w-5 mr-4" src="/svg/email.svg" alt="" />
                  <input
                    className="focus:outline-none autofocus"
                    type="email"
                    placeholder="Nhập tài khoản email"
                    required
                    value={info.email}
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                  />
                </span>
                <span className="flex flex-row border-1 px-4 border-gray-100 bg-white text-black shadow-lg p-2 rounded-lg">
                  <img className="w-5 mr-4" src="/svg/password.svg" alt="" />
                  <input
                    className="focus:outline-none autofocus"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    required
                    value={info.password}
                    onChange={(e) =>
                      setInfo({ ...info, password: e.target.value })
                    }
                  />
                </span>
                <input
                  className="bg-sky-600 py-2 rounded-lg text-white hover:bg-sky-800 cursor-pointer"
                  type="submit"
                  value={isLoading ? `Đang đăng nhập` : "Đăng nhập"}
                  disabled={isLoading}
                />
                <h4 className="text-center text-[13px]">
                  Chưa có tài khoản?{" "}
                  <Link href="/register">Đăng ký tại đây</Link>
                </h4>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
