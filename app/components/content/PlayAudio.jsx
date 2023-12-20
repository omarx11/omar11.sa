"use client";
import { useEffect, useState } from "react";

export default function PlayAudio() {
  const [isAudioStart, setIsAudioStart] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("identify");
    if (!isAudioStart) {
      audio.pause();
    } else {
      audio.volume = 0.5;
      audio.play();
    }
    audio.onended = () => {
      setIsAudioStart(false);
      audio.currentTime = 0;
    };
  }, [isAudioStart]);

  return (
    <div className="hidden sm:block">
      <button
        aria-label="Play Audio"
        className="absolute -top-[38px] right-0 rounded-full bg-neutral-900 p-1.5 hover:bg-neutral-700/75"
        onClick={(e) => {
          e.preventDefault();
          isAudioStart ? setIsAudioStart(false) : setIsAudioStart(true);
        }}
      >
        {isAudioStart ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
          </svg>
        )}
      </button>
      <audio
        src="/static/audio/Giovanni_pre_s75_sb100_se0_b_m2.mp3"
        id="identify"
        className="hidden"
        preload="none"
      ></audio>
    </div>
  );
}
