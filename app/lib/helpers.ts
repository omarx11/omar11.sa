export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const relativeTime = (time: Date | number): string => {
  const relativeTimePeriods: [number, string][] = [
    [31536000, "year"],
    [2419200, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  // Helper function to calculate relative time
  const getRelativeTime = (seconds: number): string => {
    for (const [secondsPer, name] of relativeTimePeriods) {
      if (seconds >= secondsPer) {
        const amount = Math.floor(seconds / secondsPer);
        return `for ${amount} ${name}${amount > 1 ? "s" : ""}`;
      }
    }
    return "Just now";
  };

  const date = typeof time === "number" ? new Date(time * 1000) : time;
  const seconds = (new Date().getTime() - date.getTime()) / 1000;

  return getRelativeTime(seconds);
};

export const dateStyle = (data: Date | number | string): string => {
  const f = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return f.format(new Date(data));
};
