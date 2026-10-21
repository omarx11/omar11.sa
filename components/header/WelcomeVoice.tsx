"use client";

import { useRef, useState } from "react";

/** The header's play/pause button for the welcome voice line. */
export default function WelcomeVoice() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.volume = 0.6;
    setPlaying(true);
    audio.play().catch((error) => {
      console.error("Failed to play the welcome voice line", error);
      setPlaying(false);
    });
  };

  return (
    <div className="hidden sm:block">
      <button
        aria-label={playing ? "Pause welcome message" : "Play welcome message"}
        className="absolute -top-9.5 right-0 rounded-full bg-neutral-900 p-1.5 hover:bg-neutral-700/75"
        onClick={toggle}
        type="button"
      >
        {playing ? (
          <svg
            aria-hidden="true"
            height="14"
            viewBox="0 0 24 24"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" fill="currentColor" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            fill="currentColor"
            height="14"
            viewBox="0 0 20 20"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </button>
      {/* biome-ignore lint/a11y/useMediaCaption: a short optional welcome voice line, played only on click */}
      <audio
        aria-label="Welcome voice line"
        className="hidden"
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          setPlaying(false);
        }}
        preload="none"
        ref={audioRef}
        src="/static/audio/welcome-voice.mp3"
      />
    </div>
  );
}
