"use client";

import { useEffect, useRef, useState } from "react";

export default function PlayAudio() {
  const [isAudioStart, setIsAudioStart] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioStart) {
      audio.volume = 0.6;
      audio
        .play()
        .catch((error) => console.error("Failed to play audio", error));
    } else {
      audio.pause();
    }

    audio.onended = () => {
      setIsAudioStart(false);
      if (audio) audio.currentTime = 0;
    };

    // Clean up event listener on component unmount
    return () => {
      if (audio) {
        audio.onended = null;
      }
    };
  }, [isAudioStart]);

  return (
    <div className="hidden sm:block">
      <button
        aria-label={isAudioStart ? "Pause Audio" : "Play Audio"}
        className="absolute -top-[38px] right-0 rounded-full bg-neutral-900 p-1.5 hover:bg-neutral-700/75"
        onClick={(e) => {
          e.preventDefault();
          setIsAudioStart((prev) => !prev);
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
        ref={audioRef}
        className="hidden"
        preload="none"
      ></audio>
    </div>
  );
}
