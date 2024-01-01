"use client";
import GitHubCalendar from "react-github-calendar";

// Documentation: https://grubersjoe.github.io/react-activity-calendar/?path=/docs/react-activity-calendar--docs
const GithubCal = () => {
  return (
    <GitHubCalendar
      username="omarx11"
      blockSize={14}
      blockMargin={6}
      fontSize={14}
      loading={false}
      colorScheme="dark"
      style={{
        marginTop: "3rem",
        color: "rgb(163 163 163)",
        width: "100%",
      }}
    />
  );
};

export default GithubCal;
