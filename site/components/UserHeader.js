import UserContext from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function UserHeader({ data }) {
  const router = useRouter();
  const [found,setFound] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem("LinkTreeToken");
    router.push("/login");
  };

  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) {
      return (window.location.href = "/login");
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/dashboard`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Kết nối server thất bại!");
        }
        setUserData(data.data);
        setFound(true)
        localStorage.setItem("userHandle", data.data.handle);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {!found &&  <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#00000080] z-40 flex justify-center items-center flex-col">
    <progress className="progress progress-success w-56 z-50"></progress>
    <p className="text-white">Đang tải thông tin!</p>
    </div>}
      <section className="flex flex-wrap-reverse gap-4 justify-between items-end">
        <div className="flex gap-2 lg:gap-8 flex-wrap">
        <div className="flex">
            <Link
              className="border bg-green-600 border-green-800 px-4 py-2 text-[13px] flex gap-2 items-center rounded-lg text-white"
              href="/dashboard"
            >
              <img src="/svg/home.svg" className="w-4" />
              <p>Dashboard</p>
            </Link>
          </div>
  
          <div className="flex">
            <Link
              className="border border-indigo-800 px-4 py-2 text-[13px] flex gap-2 items-center rounded-lg text-indigo-800"
              href="/edit/links"
            >
              <img src="/svg/edit.svg" className="w-4" />
              <p>Chỉnh sửa liên kết</p>
            </Link>
          </div>
  
          <div className="flex">
            <Link
              className="border border-indigo-800 px-4 py-2 text-[13px] flex gap-2 items-center rounded-lg bg-indigo-800 text-white"
              href="/edit/profile"
            >
              <img src="/svg/plus.svg" className="w-4" />
              <p>Chỉnh sửa thông tin</p>
            </Link>
          </div>

          <div className="flex">
            <Link
              className="border border-sky-600 bg-sky-600 px-4 py-2 text-[13px] flex gap-2 items-center rounded-lg bg-white-800 text-white"
              href={`/edit/theme`}
            >
              <p>Tùy chỉnh giao diện hiển thị</p>
            </Link>
          </div>
  
          <div className="flex">
            <Link
              className="border border-green-800 px-4 py-2 text-[13px] flex gap-2 items-center rounded-lg bg-white-800 text-green-800"
              href={`/${userData.handle}`}
              target="_blank"
            >
              <img src="/svg/go.svg" className="w-4" />
              <p>Đến trang LinkTree</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 bg-indigo-200 py-2 items-center px-6 rounded-lg">
            <div className="flex flex-col text-right">
              <b className="text-[13px]">{userData?.handle}</b>
              <p className="text-[12px]">{userData?.role} Pack</p>
            </div>
            <img
              className="w-10 rounded-full"
              src={userData?.avatar || "/svg/user.svg"}
              alt=""
            />
          </div>
          <div className="flex border-l items-center pl-4 gap-4">
            <span className="cursor-pointer">
              <img className="w-5" src="/svg/bell.svg" alt="" />
            </span>
            <span onClick={handleLogout} className="cursor-pointer">
              <img className="w-5" src="/svg/logout.svg" alt="" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
