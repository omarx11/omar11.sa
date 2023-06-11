"use client";
import { useLanyardWS } from "use-lanyard";

function Status({ status, activities, className }) {
  const activitie =
    activities === undefined ? "on desktop" : `On: ${activities}`;

  let color;
  if (status == "online") {
    color = `bg-green-400 border-green-300 ${className}`;
  } else if (status == "idle") {
    color = `bg-yellow-400 border-yellow-300 ${className}`;
  } else if (status == "offline") {
    color = `bg-gray-400 border-gray-300 ${className}`;
  } else if (status == "dnd") {
    color = `bg-rose-400 border-rose-300 ${className}`;
  }

  return (
    <div className={color}>
      <div
        className="pointer-events-none absolute left-1/2 w-max -translate-x-1/2 -translate-y-8 rounded-md bg-gray-800 
px-1 text-sm text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {activitie}
      </div>
    </div>
  );
}

export default function Discord({ id }) {
  const data = useLanyardWS(id);
  if (data === undefined)
    return (
      <p className="ml-1 text-sm text-emerald-300">Loading discord status...</p>
    );

  if (data) {
    const status =
      data.discord_status == "dnd" ? (
        <>
          online. <span className="text-sm text-red-500">(do not disturb)</span>
        </>
      ) : (
        data.discord_status + "."
      );

    return (
      <>
        <Status
          status={data.discord_status}
          activities={data.activities[0]?.name}
          className="group relative ml-1 flex h-3 w-3 cursor-pointer justify-center rounded-full border-2 ring-4 ring-slate-500/50"
        ></Status>
        <p>currently {status}</p>
      </>
    );
  } else return <></>;
}
