import UserHeader from "@/components/UserHeader";
import UserContext from "@/context/userContext";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [social, setSocial] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("/svg/user.svg");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setAvatar(userData.avatar);
      setBio(userData.bio);
      setSocial(userData.socialMedia)
    }
  }, [userData]);

  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('LinkTreeToken')) return router.push('/login')

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/socials`, {
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
        setSocial(data.data)
        })
        .catch((err) => {
          console.log(err.message);
        });

  }, []);

  const saveProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save/profile`,{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
         tokenMail: localStorage.getItem("LinkTreeToken"),
         profile: {
            name: name,
            bio: bio,
            avatar: avatar
         }
        })
      }).then(res  => res.json()).then(data => {
        if(data.status===400){
          return toast.error("Lỗi xảy ra khi lưu thông tin!")
        }
        toast.success('Cập nhật thành công!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }).catch(err => {
        console.log(err.message)
      })
  }

  const saveSocials = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save/socials`,{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
         tokenMail: localStorage.getItem("LinkTreeToken"),
         socials: social
        })
      }).then(res  => res.json()).then(data => {
        if(data.status===400){
          return toast.error("Lỗi xảy ra khi lưu thông tin!")
        }
        toast.success('Cập nhật thành công!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }).catch(err => {
        console.log(err.message)
      })
  }

  return (
    <>
    <Head>
      <title>Thông tin cá nhân</title>
    </Head>
      <div className={"main min-h-screen flex bg-slate-100 p-8 flex-col"}>
        <UserHeader />
        <main className="mt-8">
          <section>
            <p className="bg-slate-200 p-4 rounded-lg font-semibold mb-4">
              Chỉnh sửa thông tin cá nhân
            </p>

            <div className="flex justify-center items-center flex-col">
              <h1 className="font-bold">Thông tin cá nhân</h1>
              <div className="w-full lg:w-[60%] flex flex-col mt-4 gap-6">
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/name.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Nhập tên mới!"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/text.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                    placeholder="Nhập bio mới!"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/editavatar.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    onChange={(e)=>setAvatar(e.target.value)}
                    value={avatar || "/svg/user.svg"}
                  />
                  <img className="w-12 rounded-full" src={avatar || "/svg/user.svg"} alt="" />
                </div>
                <div className="w-full flex justify-between  flex-wrap">
                <Link target="_blank" href="https://upload-getlink.vercel.app/home" onClick={saveProfile} className="bg-sky-600 ml-auto px-4 py-1 rounded-lg text-white hover:bg-sky-800 duration-500">
                    Tạo liên kết ảnh tại đây
                  </Link>
                  <button onClick={saveProfile} className="bg-green-600 ml-auto px-4 py-1 rounded-lg text-white hover:bg-green-800 duration-500">
                    Lưu thông tin
                  </button>
                </div>  
              </div>

              <h1 className="font-bold mt-12">Liên kết mạng xã hội</h1>
              <div className="w-full lg:w-[60%] flex flex-col mt-4 gap-6">
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/fb.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.facebook}
                    onChange={(e)=>setSocial({...social,facebook: e.target.value})}
                    placeholder="Facebook ID @"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/igi.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.instagram}
                    onChange={(e)=>setSocial({...social,instagram: e.target.value})}
                    placeholder="Instagram ID @"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/ytb.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.youtube}
                    onChange={(e)=>setSocial({...social,youtube: e.target.value})}
                    placeholder="Youtube ID @"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/github.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.github}
                    onChange={(e)=>setSocial({...social,github: e.target.value})}
                    placeholder="Github ID @"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/tw.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.twitter}
                    onChange={(e)=>setSocial({...social,twitter: e.target.value})}
                    placeholder="Twitter ID @"
                  />
                </div>
                <div className="flex gap-2 items-center bg-white px-4 py-2 border-2 shadow-sm rounded-lg">
                  <img className="w-6" src="/svg/in.svg" alt="" />
                  <input
                    className="pl-2 border-l-2 h-[32px] w-full outline-none"
                    value={social?.linkedin}
                    onChange={(e)=>setSocial({...social,linkedin: e.target.value})}
                    placeholder="Linkedin ID @"
                  />
                </div>
                <button onClick={saveSocials} className="bg-green-600 ml-auto px-4 py-1 rounded-lg text-white hover:bg-green-800 duration-500">
                  Lưu thông tin
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
