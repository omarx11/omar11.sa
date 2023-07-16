export default function Loading() {
  return (
    <div className="h-full w-full rounded-lg bg-stone-800/40" />
    // <ul className="fade-in list-none space-y-2">
    //   {[...Array(19).keys()].map((i) => (
    //     <li key={i}>
    //       <span
    //         className="inline-block h-5 w-full animate-pulse bg-gray-800/40"
    //         style={{
    //           animationDelay: `${i * 0.05}s`,
    //           animationDirection: "1s",
    //         }}
    //       />
    //     </li>
    //   ))}
    // </ul>
  );
}
