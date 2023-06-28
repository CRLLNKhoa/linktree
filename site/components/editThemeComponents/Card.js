import React from "react";

export default function Card({index, type = 2, even=false, color = "bg-white" }) {
  if (type === 1) {
    return (
      <div
        className={`flex transition-all duration-500 ${(Math.floor(index%2) !== 0  &&  even) && "flex-row-reverse"} hover:translate-x-1 hover:translate-y-1 ${color==="bg-black" && "text-white"} cursor-pointer duration-500 hover:bg-sky-400 hover:text-white items-center gap-2 ${color} py-2 px-6 w-[80%] rounded-full`}
      >
         <div className="bg-white w-6 h-6  rounded-lg flex  justify-center items-center">
          <img className="w-4 h-4 z-20" src="/svg/link.svg" alt="" />
        </div>
        <b className="text-[13px]">Liên kết của tôi!</b>
      </div>
    );
  }

  if (type === 2) {
    return (
      <div
        className={`flex  transition-all duration-500 ${(Math.floor(index%2) !== 0  &&  even) && "flex-row-reverse"} relative ${color} hover:translate-x-1 ${color==="bg-black" && "text-white"} z-20 hover:translate-y-1 cursor-pointer duration-500 hover:bg-sky-400 hover:text-white items-center gap-2 py-2 px-6 w-[80%] rounded-lg`}
      >
        <div className="bg-white w-6 h-6  rounded-lg flex  justify-center items-center">
          <img className="w-4 h-4 z-20" src="/svg/link.svg" alt="" />
        </div>
        <b className="text-[13px] z-20  ">Liên kết của tôi!</b>
      </div>
    );
  }

  if (type === 3) {
    return <div>3</div>;
  }

  if (type === 4) {
    return <div>4</div>;
  }
}
