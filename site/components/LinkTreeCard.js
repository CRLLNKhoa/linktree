import Link from "next/link";
import React from "react";

export default function LinkTreeCard({ title, url,icon }) {
  return (
    <>
      <span className="w-full bg-black hover:bg-sky-600 transition-all">
        <Link
          className="flex p-4 bg-inherit gap-4  items-center rounded-lg hover:translate-x-1 duration-500 hover:translate-y-1"
          href={url}
        >
          <div className="w-8 h-8 flex justify-center items-center bg-white rounded-lg overflow-hidden">
            <img className="w-6 h-6" src={icon} alt="" />
          </div>
          <h4 className="text-white">{title}</h4>
        </Link>
      </span>
    </>
  );
}
