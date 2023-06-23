import MyHead from "@/components/MyHead";
import UserHeader from "@/components/UserHeader";
import UserContext from "@/context/userContext";
import { data } from "autoprefixer";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [data, setData] = useState({});
  const { setUserData } = useContext(UserContext);
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
        setData(data.data);
        setUserData(data.data);
        localStorage.setItem("userHandle", data.data.userHandle);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
    <MyHead
        title="Thống kê tài khoản"
        description="Đăng nhập tạo linktree của bản thân"
        image="https://www.gosite.com/hubfs/GoSite_LinkTreeExamples.png"
        url="https://linktree-crllnkhoa.vercel.app/"
      />
      <div className={"main min-h-screen flex bg-slate-100 p-8 flex-col"}>
        {/* NOTE Header */}
        <UserHeader data={data} />
        {/* NOTE Nav */}
        <section className="grid grid-cols-4 gap-6 mt-8">
          <div className="flex col-span-4 lg:col-span-1 items-center border-2 shadow-sm p-4 rounded-lg">
            <img className="w-8" src="/svg/link.svg" alt="" />
            <div className="border-l-2 pl-6 ml-4">
              <b>{data?.links}</b>
              <p>Liên kết</p>
            </div>
          </div>
          <div className="flex col-span-4 lg:col-span-1 items-center border-2 shadow-sm p-4 rounded-lg">
            <img className="w-8" src="/svg/growth.svg" alt="" />
            <div className="border-l-2 pl-6 ml-4">
              <b>
                **%{" "}
                <i className="text-[10px] text-red-500 font-bold">
                  Comming soon
                </i>
              </b>
              <p>Tăng trung bình</p>
            </div>
          </div>
          <div className="flex col-span-4 lg:col-span-1 items-center border-2 shadow-sm p-4 rounded-lg">
            <img className="w-8" src="/svg/down.svg" alt="" />
            <div className="border-l-2 pl-6 ml-4">
              <b>
                **%{" "}
                <i className="text-[10px] text-red-500 font-bold">
                  Comming soon
                </i>
              </b>
              <p>Giảm</p>
            </div>
          </div>
          <div className="flex col-span-4 lg:col-span-1 items-center border-2 shadow-sm p-4 rounded-lg">
            <img className="w-8" src="/svg/up.svg" alt="" />
            <div className="border-l-2 pl-6 ml-4">
              <b>
                **%{" "}
                <i className="text-[10px] text-red-500 font-bold">
                  Comming soon
                </i>
              </b>
              <p>Tăng mạnh</p>
            </div>
          </div>
        </section>
        {/* NOTE  Body */}
        <section className="grid grid-cols-4 gap-6 mt-8 items-start">
          <div className="col-span-4 lg:col-span-2 border-2 p-4 rounded-lg shadow-sm">
            <h1 className="font-semibold mb-4">Thống kê theo tháng:</h1>
            <div className=" w-full h-[240px] rounded-lg flex items-center justify-center">
              <img className="w-full h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbfmdMe7gfhQ3_CCy_C6dkkDVoUmZar8uEOPolR6eYollu36kzsmueFSCbLpwQBbl0Y8&usqp=CAU" alt="" />
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 flex flex-col border-2 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between border-b-2 pb-2">
              <b>Liên kết</b>
              <b>Clicks</b>
            </div>
            <div className="flex flex-col py-2 px-2 overflow-y-scroll h-[246px] gap-3">
              {data?.list?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="w-[80%] flex items-center gap-2">
                    <img className="w-6" src="/svg/internet.svg" />
                    <p
                      title="Portfolio website website website website"
                      className="truncate text-[13px]"
                    >
                      {item.title}
                    </p>
                  </div>
                  <b className="text-[13px]">{index + 10}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-1 border-2 p-4 rounded-lg shadow-sm">
            <b className="">Thống kê</b>
            <div className="bg-slate-300 mt-4 w-full h-[240px] rounded-lg flex items-center justify-center">
              <img className="w-full h-full" src="https://user-images.githubusercontent.com/24536718/111211596-9861e900-85f4-11eb-8fc0-7ceca24d6003.png" alt=""/>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
