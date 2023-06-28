import Link from "next/link";
import React from "react";

export default function LinkTreeCard({ title, url,icon ,type,bg,index,even=false}) {
  return (
    <>
      <span className={`w-full ${bg} hover:bg-sky-600 group transition-all`}>
        <Link
        target="_blank"
          className={`flex p-4 bg-inherit gap-4 ${(Math.floor(index%2) !== 0  &&  even) && "flex-row-reverse"}  items-center ${type ===1 ? "rounded-full" : "rounded-lg"} hover:translate-x-1 duration-500 hover:translate-y-1`}
          href={url}
        >
          <div className="w-8 h-8 flex justify-center items-center bg-white rounded-lg overflow-hidden">
            <img className="w-6 h-6" src={icon} alt="" />
          </div>
          <h4 className={`${bg === "bg-black" ? "text-white"  : "text-black"} duration-500 group-hover:text-white`}>{title}</h4>
        </Link>
      </span>
    </>
  );
}
