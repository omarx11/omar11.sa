// Characters that render as nothing (zero-width space, word joiner, BOM) or as
// blank space without counting as whitespace in regexes (Braille blank, Hangul
// fillers), which could be used to post a block of empty space. The emoji
// joiner (U+200D) is kept: it's part of emoji like 👨‍👩‍👧.
const INVISIBLE = /[\u200B\u2060\uFEFF]/g;
const BLANK = /[\u2800\u3164\u115F\u1160\uFFA0]/g;

/**
 * Cleans up blank space in a guestbook comment while it's typed: at most two
 * empty lines in a row (lines of only spaces count as empty), no runs of
 * spaces, no invisible filler characters, nothing blank at the start. Text is
 * otherwise unchanged, so it's safe to run on every keystroke. (A space at
 * the end of a line stays here, or it couldn't be typed before a line break.)
 */
export function tidyWhitespace(text: string): string {
  return text
    .replace(INVISIBLE, "")
    .replace(BLANK, " ")
    .replace(/\r\n?/g, "\n")
    .replace(/\n(?:[^\S\n]*\n){3,}/g, "\n\n\n")
    .replace(/[^\S\n]{2,}/g, " ")
    .replace(/^\s+/, "");
}

/** A comment as saved and shown: also no spaces at line ends or at the end. */
export function tidyComment(text: string): string {
  return tidyWhitespace(text)
    .replace(/[^\S\n]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trimEnd();
}
