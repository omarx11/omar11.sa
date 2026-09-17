import Link from "next/link";
import { Fragment } from "react";

const MarkdownLite = ({ text }: { text: string }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null = linkRegex.exec(text);

  while (match !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(
        <Fragment key={`text-${matchStart}`}>
          {text.slice(lastIndex, matchStart)}
        </Fragment>,
      );
    }

    parts.push(
      <Link
        className="break-words text-blue-600 underline underline-offset-2"
        href={linkUrl}
        key={`link-${matchStart}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {linkText}
      </Link>,
    );

    lastIndex = matchEnd;
    match = linkRegex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(
      <Fragment key={`text-tail-${lastIndex}`}>
        {text.slice(lastIndex)}
      </Fragment>,
    );
  }

  return <>{parts}</>;
};

export default MarkdownLite;
