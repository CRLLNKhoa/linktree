import React, { useEffect, useState } from "react";
import LinkTreeCard from "./LinkTreeCard";
import { AnimatePresence, motion } from "framer-motion";
import { myData } from "@/mydata";

export default function LinkTree({ data, noLoad }) {
  const { name = "", avatar = "/svg/user.svg", bio, links = [] } = data;
  const [from, setfrom] = useState(0);
  const [to, setto] = useState(4);
  const [currPage, setcurrPage] = useState(1);
  const [statusMusic, setstatusMusic] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/sound/music.mp3")
  );

  const handlePlay = () => {
    audio.play();
    setstatusMusic(!statusMusic);
    audio.volume = 0.05;
    audio.loop
  };
  const handlePause = () => {
    audio.pause();
    setstatusMusic(!statusMusic);
    audio.volume = 0.1;
  };

  const  handleUp =  () => {
    audio.volume = 0.2;
  }
  const  handleDown =  () => {
    audio.volume = 0.02;
  }

  return (
    <>
      <section className="w-4/5 lg:w-[40%] flex flex-col items-center">
        <img className="w-24 h-24 rounded-full" src={avatar} alt="" />
        {noLoad ? (
          <h2
            className={`font-bold text-[18px] bg-black mt-4 rounded-lg px-4 ${data.theme.colorText}`}
          >
            {name ? name : "Người dùng chưa tồn tại"}
          </h2>
        ) : (
          <h2 className={`font-bold text-[18px]  mt-4 ${data.theme.colorText}`}>
            {name ? name : "Người dùng chưa tồn tại"}
          </h2>
        )}
        {noLoad ? (
          <p
            className={`text-[13px] font-semibold bg-black px-4 py-2 mt-1 text-center ${data.theme.colorText}`}
          >
            {bio}
          </p>
        ) : (
          <p
            className={`text-[13px] font-semibold mt-1 text-center ${data.theme.colorText}`}
          >
            {bio}
          </p>
        )}
        <div className="bg-white justify-between rounded-lg w-full mt-4 hidden lg:flex items-center  py-2 px-4">
          <img
            className={`w-24 ${
              statusMusic && "animate-spin-slow"
            } transision-all duration-500 h-24`}
            src="/images/pngwing.com.png"
            alt=""
          />
          <div className="flex flex-1 flex-col items-center justify-between">
            <h1 className="font-bold">{myData.music}</h1>
            <div className="flex items-center justify-center">
            <span onClick={handleDown} className="cursor-pointer">
                <img className="w-10 h-10" src="/svg/down1.svg" alt="" />
              </span>
              <span  className="cursor-pointer">
                <img className="w-10 h-10" src="/svg/prev.svg" alt="" />
              </span>
              {statusMusic === true ? (
                <span onClick={handlePause} className="cursor-pointer">
                  <img className="w-10 h-10" src="/svg/pause.svg" alt="" />
                </span>
              ) : (
                <span onClick={handlePlay} className="cursor-pointer">
                  <img className="w-10 h-10" src="/svg/play.svg" alt="" />
                </span>
              )}
              <span  className="cursor-pointer">
                <img className="w-10 h-10" src="/svg/next.svg" alt="" />
              </span>
              <span onClick={handleUp} className="cursor-pointer">
                <img className="w-10 h-10" src="/svg/up1.svg" alt="" />
              </span>
            </div>
          </div>
          <label className="swap swap-flip text-[60px]">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            <div className="swap-on">💖</div>
            <div className="swap-off">🎁</div>
          </label>
        </div>
        <div className="w-full flex flex-col gap-4 pb-[40px]">
          <AnimatePresence>
            {links?.map((link, index) => {
              if (from <= index && index <= to) {
                return (
                  <motion.div
                    className="w-full"
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: index * 0.1 + 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <LinkTreeCard
                      even={true}
                      index={index}
                      bg={data.theme.colorCard}
                      type={data.theme.typeCard}
                      icon={link.icon}
                      title={link.title}
                      url={link.url}
                    />
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </div>
        <div className="mb-12">
          {links?.length > 5 && (
            <div className="join w-full flex justify-center mt-12">
              {links.map((item, index) => {
                if (index <= Math.round(links.length / 5)) {
                  return (
                    <input
                      key={index}
                      className="join-item btn btn-square btn-md"
                      type="radio"
                      name="options"
                      aria-label={index + 1}
                      checked={currPage === index + 1}
                      onChange={() => {
                        setfrom(index + index * 4);
                        setto(index + 4 + index * 4);
                        setcurrPage(index + 1);
                      }}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
