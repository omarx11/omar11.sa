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

  return (
    <GitHubCalendar
      blockMargin={6}
      blockSize={14}
      colorScheme="dark"
      fontSize={14}
      loading={false}
      style={{
        marginTop: "3rem",
        color: "rgb(163,163,163)",
        width: "100%",
      }}
      username="omarx11"
    />
  );
};

export default GithubCal;
