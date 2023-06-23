import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import Link from "next/link";
import MyHead from "@/components/MyHead";

const Apply = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [info, setInfo] = useState({
    handle: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // NOTE handleRegister
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!category) {
      setIsLoading(false);
      return toast.error("Bạn chưa chọn loại tài khoản!");
    }
    // backenđ part
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...info,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          localStorage.setItem("LinkTreeToken", data.token);
          setSubmitted(true);
          setIsLoading(false);
          router.push("/login");
        }
        if (data.status === "error") {
          toast.error("Username hoặc email đã tồn tại!");
          setIsLoading(false);
        }
      }).catch(err=> console.log("lỗi"))
  };

  return (
    <>
    <MyHead
        title="Đăng ký"
        description="Đăng ký tạo linktree của bản thân"
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
                Đăng ký để tham gia
              </h1>
              <p>Tạo hồ sơ để chia sẻ các liên kết của bạn</p>
              <b className="text-[13px]">Start building your Hub</b>
            </div>
            <div className="">
              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <span className="flex flex-row border-1 px-4 border-gray-100 bg-white text-black shadow-lg p-2 rounded-lg">
                  <img className="w-6 mr-4" src="/svg/ig.svg" alt="" />
                  <input
                    className="focus:outline-none autofocus"
                    type="text"
                    placeholder="Tên hiển thị"
                    required
                    value={info.handle}
                    onChange={(e) =>
                      setInfo({ ...info, handle: e.target.value })
                    }
                  />
                </span>
                <input
                  className="border-1 border-gray-100 py-2 px-4 bg-white text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus"
                  type="email"
                  placeholder="Nhập tài khoản email"
                  required
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
                <input
                  className="border-1 border-gray-100 py-2 px-4 bg-white text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus"
                  type="password"
                  placeholder="Đặt mật khẩu"
                  required
                  value={info.password}
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                />
                <h5 className="text-center text-[13px]">Loại tài khoản:</h5>
                <div className="flex justify-between">
                  <label
                    className="flex text-[14px] gap-2 cursor-pointer"
                    for="creator"
                  >
                    <input
                      id="creator"
                      type="checkbox"
                      checked={category === "Creator"}
                      onChange={() => setCategory("Creator")}
                    />
                    <p>Creator</p>
                  </label>
                  <label
                    className="flex text-[14px] gap-2 cursor-pointer"
                    for="agency"
                  >
                    <input
                      id="agency"
                      type="checkbox"
                      checked={category === "Agency"}
                      onChange={() => setCategory("Agency")}
                    />
                    <p>Agency</p>
                  </label>
                  <label
                    className="flex text-[14px] gap-2 cursor-pointer"
                    for="brand"
                  >
                    <input
                      id="brand"
                      type="checkbox"
                      checked={category === "Brand"}
                      onChange={() => setCategory("Brand")}
                    />
                    <p>Brand</p>
                  </label>
                </div>
                <input
                  className={`${
                    isLoading
                      ? "bg-red-700 hover:bg-red-900 cursor-wait"
                      : "bg-sky-600 hover:bg-sky-800 cursor-pointer"
                  } py-2 rounded-lg text-white`}
                  type="submit"
                  value={isLoading ? "Đang đăng ký..." : "Đăng ký"}
                  disabled={isLoading}
                />
                <Link className="text-[13px] text-center" href="/login">Trở về đăng nhập</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
