"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

// Documentation: https://grubersjoe.github.io/react-activity-calendar/?path=/docs/react-activity-calendar--docs
const GithubCal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // The calendar forces `width: max-content` inline; containing its inline size
  // stops it from widening the page on small screens (it scrolls instead).
  return (
    <div className="mt-12 w-full contain-inline-size">
      <GitHubCalendar
        blockMargin={6}
        blockSize={14}
        colorScheme="dark"
        fontSize={14}
        loading={false}
        style={{ color: "rgb(163,163,163)" }}
        username="omarx11"
      />
    </div>
  );
};

export default GithubCal;
