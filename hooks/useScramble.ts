"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ0123456789";

const noise = (text: string) =>
  Array.from(text, (char) =>
    char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  ).join("");

/**
 * The site's "matrix" decode: random glyphs that lock into `text` left to
 * right (~0.6 s). Calls `onFrame` with each frame; returns a cancel function.
 * Does nothing (beyond showing `text`) when the visitor prefers less motion.
 */
export function scramble(
  text: string,
  onFrame: (shown: string) => void,
): () => void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onFrame(text);
    return () => {};
  }
  const start = performance.now();
  let frame = 0;
  let step = -1;
  const tick = (now: number) => {
    const elapsed = now - start;
    // A new set of glyphs every 35ms reads as flicker, not blur.
    if (Math.floor(elapsed / 35) !== step) {
      step = Math.floor(elapsed / 35);
      const locked = Math.ceil(
        Math.max(0, ((elapsed - 200) / 380) * text.length),
      );
      onFrame(text.slice(0, locked) + noise(text.slice(locked)));
      if (locked >= text.length) return;
    }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

/**
 * `text`, decoded with `scramble` when it first shows and whenever it changes.
 * Starts as glyphs, so the real text never flashes before the effect. Only for
 * content rendered on the client (random glyphs wouldn't match server HTML).
 */
export function useScramble(text: string): string {
  const [shown, setShown] = useState(() => noise(text));
  // The last frame is always the full text, so stopping early needs no reset.
  useEffect(() => scramble(text, setShown), [text]);
  return shown;
}
