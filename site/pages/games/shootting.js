import React, { useState } from "react";
import style from "../../styles/games.module.css";

export default function Shotting() {
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/sound/shoot.mp3")
  );
  const [point,setPoint]  = useState(0)
  const [position,setPosition] = useState(10)
  return (
    <div onClick={() => {
      audio.play();
      setPoint(point -1);
      setPosition(Math.floor(Math.random()*10) +  1)
    }} className="cursor-default relative w-screen z-10 h-screen bg-[url('/svg/bia.svg')] bg-no-repeat bg-contain bg-center">
      {position === 1 && <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-1/2 left-1/2 z-50 fixed cursor-default"
      ></button>}
      {position === 2 && <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-1/3 left-[40%] z-50 fixed  cursor-default"
      ></button>}
       {position === 3 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[70%] left-[40%] z-50 fixed cursor-default"
      ></button>}
       {position === 4 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[70%] left-[60%] z-50 fixed cursor-default"
      ></button>}
       {position === 5 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[60%] left-[50%] z-50 fixed cursor-default"
      ></button>}
       {position === 6 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[20%] left-[50%] z-50 fixed cursor-default"
      ></button>}
       {position === 7 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[40%] left-[50%] z-50 fixed cursor-default"
      ></button>}
       {position === 8 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[30%] left-[45%] z-50 fixed cursor-default"
      ></button>}
       {position === 9 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[60%] left-[50%] z-50 fixed cursor-default"
      ></button>}
       {position === 10 &&  <button
        onClick={() => {
          audio.play();
          setPoint(point + 1);
          setPosition(Math.floor(Math.random()*10) +  1)
        }}
        className="w-8 h-8 bg-red-600 rounded-full top-[30%] left-[54%] z-50 fixed cursor-default"
      ></button>}

      <p>{point}</p>
    </div>
  );
}

const Item = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/sound/shoot.mp3")
  );

  const handleClick = () => {
    const timer = setTimeout(() => {
      setIsHidden(false);
    }, 3000);
  };
  return (
    <div
      onClick={() => {
        setIsHidden(true);
        handleClick();
        audio.play();
        // setScore(score  + 1)
      }}
      className="flex justify-center items-center w-full h-full"
    ></div>
  );
};
