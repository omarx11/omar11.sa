import Link from "next/link";
import { Fragment } from "react";

const MarkdownLite = ({ text }: { text: string }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    parts.push(
      <Link
        className="break-words text-blue-600 underline underline-offset-2"
        href={linkUrl}
        key={linkUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        {linkText}
      </Link>,
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
};

export default MarkdownLite;
