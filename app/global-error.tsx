"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <h2>Something went wrong! Check the console for more info.</h2>
        <button onClick={() => reset()} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
