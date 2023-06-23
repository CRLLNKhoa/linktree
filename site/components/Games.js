import React, { useEffect, useState } from "react";

export default function Games() {
  const [score, setScore] = useState(0);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
      <p className="bg-white text-center">
        Lần đầu sẽ tải trang hơi lâu mong bạn thông cảm!
      </p>
      <h1 className="bg-white">Điểm:{score}</h1>
      <div className="w-full h-full flex justify-center items-end bg-sky-600">
        <div className="w-[40%] h-[80%] relative">
          <img
            className={`w-full h-full cursor-pointer`}
            src="/svg/tree.svg"
            alt=""
          />
          <div className="absolute hover:translate-y-1  duration-500 top-[20%]  left-[28%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[35%]  left-[12%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[60%]  left-[28%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[40%]  left-[28%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[20%]  left-[68%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[20%]  left-[48%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[40%]  left-[48%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[6%]  left-[48%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[60%]  left-[48%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[20%]  left-[48%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[40%]  left-[68%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[60%]  left-[62%]">
            <Dot score={score} setScore={setScore} />
          </div>
          <div className="absolute hover:translate-y-1  duration-500 top-[40%]  left-[82%]">
            <Dot score={score} setScore={setScore} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Dot = ({score,setScore}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/sound/click.mp3")
  );

  const handleClick = () => {
    const timer = setTimeout(() => {
      setIsHidden(false);
    }, 3000);
  };
  return (
    <img
      onClick={() => {
        setIsHidden(true);
        handleClick();
        audio.play();
        setScore(score  + 1)
      }}
      className={`${
        isHidden ? "opacity-0" : "opacity-1"
      } w-12 h-12 cursor-pointer duration-700`}
      src="/svg/apple.svg"
      alt=""
    />
  );
};
