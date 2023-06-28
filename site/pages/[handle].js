import Games from "@/components/Games";
import LinkTree from "@/components/LinkTree";
import MyHead from "@/components/MyHead";
import SocicalMediaRow from "@/components/SocialMediaRow";
import SocicalMedia from "@/components/SocicalMedia";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Handle() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [social, setSocial] = useState({
    facebook: "",
    instagarm: "",
    youtube: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [isShow, setIsShow] = useState(true);
  const [found,setFound] = useState(false)
  const [foundMain,setFoundMain] = useState(false)

  useEffect(() => {
    if (router.query?.handle) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/get/${router.query.handle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400) {
            router.push("/404");
          }
          if (data.status === 200) {
            setData(data.data);
            setFoundMain(true)
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query?.handle) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get/social/${router.query.handle}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400) {
            router.push("/404");
          }
          if (data.status === 200) {
            setSocial(data.data);
            setFound(true)
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [router.query]);
  return (
  <>
    <MyHead
        title={`${data?.name ? (data?.name + ", xin chào bạn")  : "Linktree code by Lương Khoa"}`}
        description={data?.bio}
        image={data?.avatar}
        url="https://linktree-crllnkhoa.vercel.app/"
      />
      <div className={`w-full min-h-screen bg-no-repeat bg-center bg-cover ${data?.theme?.background} flex justify-center items-center pt-10 flex-col`}>
        {foundMain ? <LinkTree data={data} /> : <div className="flex flex-col justify-center items-center"><progress className="progress w-56"></progress>
        <p>Đang tải thông tin!</p></div>}
        {(found &&  data?.theme?.positionSocial===  1)&& <div className="w-full flex justify-center pb-8">
          <SocicalMediaRow data={social}  />
        </div>}
        {(found &&  data?.theme?.positionSocial===  2) && <button
          onClick={() => setIsShow(!isShow)}
          className="fixed bottom-4 right-4 border-2 shadow-md p-2 rounded-full z-40 cursor-pointer bg-white"
        >
          <img className="w-10 h-10" src="/svg/menu.svg" />
        </button>}
  
        <div
          className={`${
            isShow ? "-z-50 opacity-0" : "z-40 opacity-1"
          } fixed top-0 bottom-0 left-0 right-0 transition-all duration-500`}
        >
          {/* Over play */}
          <div
            onClick={() => setIsShow(!isShow)}
            className=" cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-slate-900 opacity-60"
          ></div>
          <div    className={`absolute ${
              !isShow ? "bottom-24 opacity-100" : "bottom-[100%] opacity-0"
            } right-[26px] transition-all duration-500 flex flex-col gap-4`}
           
          >
            <SocicalMedia data={social} />
          </div>
          <div
            className={`absolute ${
              !isShow ? "right-24 opacity-100" : "right-[100%] opacity-0"
            } bottom-6 transition-all duration-500 flex gap-4`}
          >
            <button onClick={() => {navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}${router.query.handle}`);toast.success("Copy success!")}} className="bg-white p-2 rounded-full">
              <img className="w-8 h-8" src="/svg/share.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
  </>
  );
}
