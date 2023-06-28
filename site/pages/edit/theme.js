import MyHead from "@/components/MyHead";
import UserHeader from "@/components/UserHeader";
import Card from "@/components/editThemeComponents/Card";
import SocialList from "@/components/editThemeComponents/SocialList";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Theme() {
  const [background, setBackground] = useState("bg-yellow-400");
  const [colorText, setColorText] = useState("text-white");
  const [cardColor, setCardColor] = useState("bg-white");
  const [typeCard, setTypeCard] = useState(1);
  const [typeMedia, setTypeMedia] = useState(1);
  const [isShow, setIsShow] = useState(true);
  const [even, setEven] = useState(false);
  const router = useRouter();

  const saveTheme = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/save/theme`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        theme: {
          background: background,
          colorText: colorText,
          colorCard: cardColor,
          typeCard: typeCard,
          positionSocial: typeMedia,
          even:  even
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          return toast.error("Lỗi xảy ra khi lưu thông tin!");
        }
        toast.success("Cập nhật thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) return router.push("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/load/theme`, {
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
        const { background, colorText, colorCard, typeCard, positionSocial,even } =   data.data;
        setBackground(background)
        setCardColor(colorCard)
        setColorText(colorText) 
        setTypeCard(typeCard)
        setTypeMedia(positionSocial)
        setEven(even)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <MyHead
        title="Chỉnh sửa giao diện"
        description="Cài đặt giao diện hiển thị"
        image="/svg/editavatar.svg"
        url="https://linktree-crllnkhoa.vercel.app/"
      />
      <div className="p-8 flex flex-col">
        <UserHeader />
        <h1 className="font-bold text-[20px] mt-4">
          Chỉnh sửa giao diện hiển thị của bạn
        </h1>
        <main className="flex flex-col lg:flex-row flex-wrap mt-8">
          <section
            className={`${background} relative flex-1 lg:basis-2/5 min-h-[90vh] border-2 shadow-sm rounded-lg flex flex-col items-center justify-start py-8 bg-no-repeat bg-cover`}
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-24 h-24 rounded-full" src="/svg/ava.svg" />
              <b className={`${colorText} flex gap-2 items-center`}>
                Nguyễn Văn A{" "}
                <img className="w-4 h-4" src="/svg/tichxanh.svg" alt="" />
              </b>
              <p className={`text-[13px] ${colorText}`}>
                Xin chào đây là bio của tôi!
              </p>
            </div>
            <div className="mt-8 flex w-full justify-center items-center gap-4 flex-col pb-16">
              <Card even={even} index={2} color={cardColor} type={typeCard} />
              <Card even={even} index={3}  color={cardColor} type={typeCard} />
              <Card even={even} index={4} color={cardColor} type={typeCard} />
              <Card even={even} index={5}  color={cardColor} type={typeCard} />
              <Card even={even} index={6} color={cardColor} type={typeCard} />
            </div>
            {typeMedia === 1 ? (
              <div className="">
                <SocialList />
              </div>
            ) : (
              <button
                onClick={() => setIsShow(!isShow)}
                className="absolute bottom-4 right-4 border-2 shadow-md p-1 rounded-full z-50 cursor-pointer bg-white"
              >
                <img className="w-10 h-10" src="/svg/menu.svg" />
              </button>
            )}

            {/* NOTE  MENU */}
            {typeMedia === 2 && (
              <div
                className={`${
                  isShow ? "-z-50 opacity-0" : "z-40 opacity-1"
                } absolute top-0 bottom-0 left-0 right-0 transition-all duration-500`}
              >
                {/* Over play */}
                <div
                  onClick={() => setIsShow(!isShow)}
                  className=" cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-slate-900 opacity-60"
                ></div>
                <div
                  className={`absolute ${
                    !isShow
                      ? "bottom-20 opacity-100"
                      : "bottom-[100%] opacity-0"
                  } right-[26px] transition-all duration-500 flex flex-col gap-4`}
                >
                  <SocialList />
                </div>
                <div
                  className={`absolute ${
                    !isShow ? "right-20 opacity-100" : "right-[100%] opacity-0"
                  } bottom-6 transition-all duration-500 flex gap-4`}
                >
                  <button className="bg-white p-2 rounded-full">
                    <img className="w-5 h-5" src="/svg/share.svg" alt="" />
                  </button>
                </div>
              </div>
            )}
          </section>
          <section className="flex-1 lg:basis-3/5 lg:px-8 mt-8">
            <b>Tùy chỉnh giao diện:</b>

            {/* NOTE Background */}
            <div className="border-2 p-2 rounded-lg mt-4 flex flex-col gap-4">
              <div className="flex items-center flex-wrap gap-4 lg:gap-8">
                <b>Màu nền:</b>
                <div className="flex gap-2 lg:gap-4 flex-wrap">
                  <div
                    onClick={() => setBackground("bg-yellow-300")}
                    className="bg-yellow-300 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-yellow-300" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-red-400")}
                    className="bg-red-400 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-red-400" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-sky-300")}
                    className="bg-sky-300 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-sky-300" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-green-400")}
                    className="bg-green-400 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-green-400" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-pink-300")}
                    className="bg-pink-300 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-pink-30" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-orange-400")}
                    className="bg-orange-400 border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-orange-400" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-black")}
                    className="bg-black border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-black" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() => setBackground("bg-white")}
                    className="bg-white border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background === "bg-white" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8 flex-wrap">
                <b>Ảnh nền:</b>
                <div className="flex gap-2 lg:gap-4 flex-wrap">
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://img.rawpixel.com/private/static/images/website/2022-05/rm218-ning-01.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=0614edfc39bea7c3fcf75ec8d3e4ab81')]"
                      )
                    }
                    className="bg-[url('https://img.rawpixel.com/private/static/images/website/2022-05/rm218-ning-01.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=0614edfc39bea7c3fcf75ec8d3e4ab81')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://img.rawpixel.com/private/static/images/website/2022-05/rm218-ning-01.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=0614edfc39bea7c3fcf75ec8d3e4ab81')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-dep-1.jpg?resize=800%2C534&ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-dep-1.jpg?resize=800%2C534&ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-dep-1.jpg?resize=800%2C534&ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/mau-background-dep-photoshop.jpg?w=494&h=370&ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/mau-background-dep-photoshop.jpg?w=494&h=370&ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/mau-background-dep-photoshop.jpg?w=494&h=370&ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-canh-dong-co.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-canh-dong-co.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-canh-dong-co.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-buc-tuong-gach-tho.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-buc-tuong-gach-tho.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-buc-tuong-gach-tho.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-bong-den-sang-theo-hang-ngang.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-bong-den-sang-theo-hang-ngang.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-bong-den-sang-theo-hang-ngang.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-ban-quan-cu.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-ban-quan-cu.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/background-dep-ban-quan-cu.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-dep.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-dep.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-dep.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-duong-pho.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-duong-pho.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-duong-pho.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      setBackground(
                        "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-cuc-quang-xanh.jpg?ssl=1')]"
                      )
                    }
                    className="bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-cuc-quang-xanh.jpg?ssl=1')] border-2 cursor-pointer duration-500 w-12 h-12 rounded-full hover:border-black flex justify-center items-center"
                  >
                    {background ===
                      "bg-[url('https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/background-anime-cuc-quang-xanh.jpg?ssl=1')]" && (
                      <img className="w-8 h-8" src="/svg/check.svg" alt="" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* NOTE Text */}
            <div className="flex gap-8 mt-8">
              <b>Màu chữ:</b>
              <div className="flex gap-8">
                <label className="cursor-pointer flex gap-2" htmlFor="white">
                  <input
                    id="white"
                    checked={colorText === "text-white"}
                    name="colorText"
                    type="radio"
                    onChange={() => setColorText("text-white")}
                  />
                  Màu trắng
                </label>
                <label className="cursor-pointer flex gap-2" htmlFor="black">
                  <input
                    id="black"
                    checked={colorText === "text-black"}
                    name="colorText"
                    type="radio"
                    onChange={() => setColorText("text-black")}
                  />
                  Màu đen
                </label>
              </div>
            </div>

            {/* NOTE Card Color */}
            <div className="flex gap-8 mt-8">
              <b>Màu thẻ:</b>
              <div className="flex gap-8">
                <label className="cursor-pointer flex gap-2" htmlFor="cwhite">
                  <input
                    id="cwhite"
                    checked={cardColor === "bg-white"}
                    name="a"
                    type="radio"
                    onChange={() => setCardColor("bg-white")}
                  />
                  Màu trắng
                </label>
                <label className="cursor-pointer flex gap-2" htmlFor="cblack">
                  <input
                    id="cblack"
                    checked={cardColor === "bg-black"}
                    name="a"
                    type="radio"
                    onChange={() => setCardColor("bg-black")}
                  />
                  Màu đen
                </label>
                <label className="cursor-pointer flex gap-2" htmlFor="cpink">
                  <input
                    id="cpink"
                    checked={cardColor === "bg-pink-200"}
                    name="a"
                    type="radio"
                    onChange={() => setCardColor("bg-pink-200")}
                  />
                  Màu hồng
                </label>
              </div>
            </div>

            {/* NOTE Card Type */}
            <div className="flex gap-8 mt-8 items-center">
              <b>Loại thẻ:</b>
              <div className="flex gap-8">
                <label
                  className="cursor-pointer flex gap-2 border-2 border-black p-2 rounded-full"
                  htmlFor="full"
                >
                  <input
                    id="full"
                    checked={typeCard === 1}
                    name="c"
                    type="radio"
                    onChange={() => setTypeCard(1)}
                  />
                </label>
                <label
                  className="cursor-pointer flex gap-2 border-2 border-black p-2 rounded-lg"
                  htmlFor="lg"
                >
                  <input
                    id="lg"
                    checked={typeCard === 2}
                    name="c"
                    type="radio"
                    onChange={() => setTypeCard(2)}
                  />
                </label>
              </div>
            </div>

                 {/* NOTE Card Type */}
                 <div className="flex gap-8 mt-8 items-center">
              <b>Vị trí nội dung thẻ:</b>
              <div className="flex gap-8">
                <label
                  className="cursor-pointer flex gap-2 p-2 rounded-full"
                  htmlFor="asdsad"
                >
                  <input
                    id="asdsad"
                    checked={even === false}
                    name="sssss"
                    type="radio"
                    onChange={() => setEven(false)}
                  />
                  Option 1
                </label>
                <label
                  className="cursor-pointer flex gap-2 p-2 rounded-lg"
                  htmlFor="asdasdaa"
                >
                  <input
                    id="asdasdaa"
                    checked={even === true}
                    name="sssss"
                    type="radio"
                    onChange={() => setEven(true)}
                  />
                  Option 2 
                </label>
              </div>
            </div>

            {/* NOTE Type Social */}
            <div className="flex gap-8 mt-8 items-center">
              <b>Vị trí các liên kết:</b>
              <div className="flex gap-8">
                <label className="cursor-pointer flex gap-2 " htmlFor="w">
                  <input
                    id="w"
                    checked={typeMedia === 1}
                    name="v"
                    type="radio"
                    onChange={() => setTypeMedia(1)}
                  />
                  Bottom
                </label>
                <label className="cursor-pointer flex gap-2 " htmlFor="e">
                  <input
                    id="e"
                    checked={typeMedia === 2}
                    name="v"
                    type="radio"
                    onChange={() => setTypeMedia(2)}
                  />
                  Fixed
                </label>
              </div>
            </div>
            <div className="w-full flex items-end mt-8">
              <button
                onClick={saveTheme}
                className="bg-sky-600 hover:bg-sky-800 duration-500 py-1 px-8 rounded-lg text-white font-semibold ml-auto"
              >
                {" "}
                Lưu cập nhât
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
