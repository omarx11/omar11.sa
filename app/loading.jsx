export default function Loading() {
  return (
    <>
      <ul className="fade-in list-none space-y-2">
        {[...Array(18).keys()].map((i) => (
          <li key={i}>
            <span
              className="inline-block h-5 w-full animate-pulse bg-emerald-800/40"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDirection: "1s",
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
