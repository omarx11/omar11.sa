import type { ReactNode } from "react";

// 24×24 stroke icons for the chat window, sized by `size` and coloured by
// `currentColor`.
function Icon({ size = 18, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

export const CloseIcon = () => (
  <Icon>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

export const NewChatIcon = () => (
  <Icon>
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);

export const StatsIcon = () => (
  <Icon>
    <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
  </Icon>
);

export const SendIcon = () => (
  <Icon size={16}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </Icon>
);

export const StopIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    height="12"
    viewBox="0 0 12 12"
    width="12"
  >
    <rect height="12" rx="2" width="12" />
  </svg>
);

export const CopyIcon = () => (
  <Icon size={13}>
    <rect height="13" rx="2" width="13" x="9" y="9" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

export const CheckIcon = () => (
  <Icon size={13}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const RetryIcon = () => (
  <Icon size={13}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
  </Icon>
);

export const ArrowDownIcon = () => (
  <Icon size={16}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </Icon>
);
