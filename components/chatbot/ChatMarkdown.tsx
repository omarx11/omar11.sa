import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { author } from "@/config/meta";

// [label](url), **bold**, `code`, or a bare https:// URL.
const TOKEN =
  /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`|(https?:\/\/[^\s)]+[^\s).,!?])/g;

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

/** This site's own pages, as a path for client-side navigation. */
function internalPath(href: string): string | null {
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    return url.origin === new URL(author.siteUrl).origin
      ? `${url.pathname}${url.search}${url.hash}`
      : null;
  } catch {
    return null;
  }
}

const linkClass =
  "wrap-break-word font-medium text-emerald-400 underline decoration-emerald-400/40 underline-offset-2 hover:decoration-emerald-400";

/**
 * Renders a reply's light markdown. Links to this site navigate in place, so
 * the chat (which lives in the layout) stays open; others open a new tab.
 */
export default function ChatMarkdown({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate?: () => void;
}) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [fullMatch, label, url, bold, code, bare] = match;
    const start = match.index;
    if (lastIndex < start) {
      parts.push(
        <Fragment key={`t${lastIndex}`}>
          {text.slice(lastIndex, start)}
        </Fragment>,
      );
    }
    if (bold) {
      parts.push(
        <strong className="font-semibold text-white" key={`b${start}`}>
          {bold}
        </strong>,
      );
    } else if (code) {
      parts.push(
        <code
          className="rounded bg-neutral-800 px-1 py-0.5 font-mono text-[0.85em] text-neutral-200"
          key={`c${start}`}
        >
          {code}
        </code>,
      );
    } else {
      const href = safeHref(url ?? bare ?? "");
      const path = href && internalPath(href);
      parts.push(
        path ? (
          <Link
            className={linkClass}
            href={path}
            key={`l${start}`}
            onClick={onNavigate}
          >
            {label ?? bare}
          </Link>
        ) : href ? (
          <a
            className={linkClass}
            href={href}
            key={`l${start}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {label ?? bare}
          </a>
        ) : (
          <Fragment key={`l${start}`}>{label ?? bare}</Fragment>
        ),
      );
    }
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <Fragment key={`t${lastIndex}`}>{text.slice(lastIndex)}</Fragment>,
    );
  }
  return <>{parts}</>;
}
