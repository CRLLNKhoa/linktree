import React from "react";
import LinkTreeCard from "./LinkTreeCard";
import { AnimatePresence,motion } from "framer-motion";

export default function LinkTree({ data }) {
  const { name="", avatar = "/svg/user.svg", bio, links } = data;
  return (
    <>
      <section className="w-4/5 lg:w-2/5 flex flex-col items-center">
        <img className="w-24 h-24 rounded-full" src={avatar} alt="" />
        <h2 className="font-semibold mt-4">{name ? name : "Người dùng chưa tồn tại"}</h2>
        <p className="text-[13px] mt-1 text-center">{bio}</p>
        <div className="w-full flex flex-col gap-4 pb-[120px]">
          <AnimatePresence>
            {links?.map((link, index) => (
              <motion.div className="w-full"
                key={index}
                initial={{ opacity: 0,  y: 40 }}
                animate={{ opacity: 1, transition: { delay:  index * 0.1 + 0.5} }}
                exit={{ opacity: 0 }}
              >
                <LinkTreeCard icon={link.icon} title={link.title} url={link.url} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
