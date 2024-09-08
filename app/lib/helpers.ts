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

  // Configure timestamp to relative time
  function relativeTime(date: Date | number, isUtc: boolean = true): string {
    if (!(date instanceof Date)) date = new Date(date * 1000);
    const seconds = (new Date().getTime() - date.getTime()) / 1000;
    for (let [secondsPer, name] of relativeTimePeriods) {
      if (seconds >= secondsPer) {
        const amount = Math.floor(seconds / secondsPer);
        return `for ${amount} ${name}${amount > 1 ? "s" : ""}`;
      }
    }
    return "Just now";
  }

  return relativeTime(time);
};

export const dateStyle = (data: Date | number | string): string => {
  const f = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return f.format(new Date(data));
};
