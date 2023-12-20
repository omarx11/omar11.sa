export const dateStyle = (data) => {
  const f = Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return f.format(new Date(data));
};
