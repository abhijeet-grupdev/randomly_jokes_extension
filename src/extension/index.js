/*global chrome*/
import React, { useEffect, useState } from "react";
import useEyeDropper from "use-eye-dropper";
import { PopupModel } from "./model";

const Extension = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const [joke, setJoke] = useState([]);
  const array = [
    "\uD83D\uDE02",
    "\uD83E\uDD23",
    "\uD83D\uDE02",
    "\uD83D\uDE02",
    "\uD83D\uDE06",
    "\uD83D\uDE01",
    "\uD83D\uDE04",
    "\uD83E\uDD1D",
    "\uD83E\uDD1B",
    "\uD83E\uDD2A",
    "\uD83E\uDD1C",
    "\uD83E\uDD29",
  ];

  function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  const randomEmoji = getRandomEmoji();

  const jokeApi = () => {
    fetch("https://icanhazdadjoke.com/slack")
      .then((result) => result.json())
      .then((result) => {
        setJoke(result.attachments);
      });
  };

  useEffect(()=>{
    jokeApi();
  },[])

  return (
    <div className="text-center">
      <h1 className="p-3 text-[20px] text-[#9f76f3]  font-bold drop-shadow-sm">
        Randomly Jokes extension
      </h1>
      <div className="flex gap-3 flex-wrap">
        <button
          className="bg-red-300 p-2 h-[25%] rounded-full"
          onClick={() => {
            setOpenPopup(true);
            jokeApi();
          }}
        >
          Joke 🤣
        </button>
      </div>

      {openPopup && <PopupModel flag={"Joke"} setOpenPopup={setOpenPopup} emoji={randomEmoji} joke={joke} />}
    </div>
  );
};

export default Extension;