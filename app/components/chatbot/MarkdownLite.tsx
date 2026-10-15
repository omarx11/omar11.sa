import { Fragment, type ReactNode } from "react";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Links in assistant replies come from model output, so only web, mail and
 * same-site URLs are made clickable (never `javascript:` or similar).
 */
function safeHref(url: string): string | null {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const { protocol } = new URL(url);
    return ["https:", "http:", "mailto:"].includes(protocol) ? url : null;
  } catch {
    return null;
  }
}

/** Renders plain text with `[label](url)` markdown links. */
export default function MarkdownLite({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK)) {
    const [fullMatch, label = "", url = ""] = match;
    const start = match.index;
    if (lastIndex < start) {
      parts.push(
        <Fragment key={`text-${lastIndex}`}>
          {text.slice(lastIndex, start)}
        </Fragment>,
      );
    }
    const href = safeHref(url);
    parts.push(
      href ? (
        <a
          className="break-words text-blue-600 underline underline-offset-2"
          href={href}
          key={`link-${start}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      ) : (
        <Fragment key={`link-${start}`}>{label}</Fragment>
      ),
    );
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <Fragment key={`text-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>,
    );
  }
  return <>{parts}</>;
}
