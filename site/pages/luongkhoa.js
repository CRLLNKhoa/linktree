import LinkTree from "@/components/LinkTree";
import MyHead from "@/components/MyHead";
import SocicalMediaRow from "@/components/SocialMediaRow";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { myData } from "@/mydata";

export default function Handle() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [isShow, setIsShow] = useState(true);
  const [found, setFound] = useState(false);
  const [foundMain, setFoundMain] = useState(false);

  return (
    <>
      <MyHead
        title={`Lương Khoa, xin chào!`}
        description="Xin chào 👋 ! Hãy nhắn vào các liên kết ở dưới ⬇️ có rất nhìu điều thú vị đấy! 👍"
        image="https://firebasestorage.googleapis.com/v0/b/upload-getlink-ab132.appspot.com/o/myImages%2Fz3933384702915_8957f9705e8e7e84969ca28b2e2174b9.jpg?alt=media&token=971d010b-13a9-45fa-ad2a-7e4f54870865"
        url="https://lienket.vercel.app/"
      />
      <div
        className={`w-full pb-12 min-h-screen bg-no-repeat bg-center bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/upload-getlink-ab132.appspot.com/o/myImages%2Fbackground-dep-buc-tuong-gach-tho%20(1).png?alt=media&token=bb796940-da89-4201-934f-ee251f1226ff')] flex justify-center items-center pt-10 flex-col`}
      >
        <LinkTree data={myData} noLoad />
        <SocicalMediaRow data={myData.socialMedia} />

      </div>
    </>
  );
}
