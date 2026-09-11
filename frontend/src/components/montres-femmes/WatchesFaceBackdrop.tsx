function WatchDial({
  className,
  hourSeconds,
  minuteSeconds,
  hourDelay,
  minuteDelay,
}: {
  className?: string;
  hourSeconds: number;
  minuteSeconds: number;
  hourDelay: string;
  minuteDelay: string;
}) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <g transform="translate(100 100)">
          <circle
            r="96"
            fill="none"
            stroke="#B8924A"
            strokeOpacity="0.16"
            strokeWidth="1.25"
          />
          <circle
            r="88"
            fill="none"
            stroke="#134A35"
            strokeOpacity="0.07"
            strokeWidth="0.6"
          />
          <circle
            r="52"
            fill="none"
            stroke="#B8924A"
            strokeOpacity="0.08"
            strokeWidth="0.5"
          />
          {Array.from({ length: 60 }, (_, i) => (
            <line
              key={i}
              y1={i % 5 === 0 ? -82 : -86}
              y2="-90"
              stroke="#134A35"
              strokeOpacity={i % 5 === 0 ? 0.22 : 0.08}
              strokeWidth={i % 5 === 0 ? 1.4 : 0.6}
              transform={`rotate(${i * 6})`}
            />
          ))}
        </g>
      </svg>
      <span
        className="watches-hand-hour absolute left-1/2 top-[24%] h-[26%] w-[3px] rounded-full bg-[#134A35]/28"
        style={{
          animationDuration: `${hourSeconds}s`,
          animationDelay: hourDelay,
        }}
      />
      <span
        className="watches-hand-minute absolute left-1/2 top-[16%] h-[34%] w-[2px] rounded-full bg-[#B8924A]/38"
        style={{
          animationDuration: `${minuteSeconds}s`,
          animationDelay: minuteDelay,
        }}
      />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8924A]/45 ring-1 ring-[#134A35]/15" />
    </div>
  );
}

export function WatchesFaceBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <WatchDial
        className="absolute -start-16 top-24 h-[22rem] w-[22rem] opacity-70 sm:start-0 sm:h-[28rem] sm:w-[28rem]"
        hourSeconds={96}
        minuteSeconds={18}
        hourDelay="-12s"
        minuteDelay="-4s"
      />
      <WatchDial
        className="absolute -end-20 top-[38%] h-[18rem] w-[18rem] opacity-50 sm:end-8 sm:h-[24rem] sm:w-[24rem]"
        hourSeconds={120}
        minuteSeconds={22}
        hourDelay="-40s"
        minuteDelay="-9s"
      />
      <WatchDial
        className="absolute -start-10 bottom-[-4rem] h-[16rem] w-[16rem] opacity-40 sm:start-[18%] sm:h-[20rem] sm:w-[20rem]"
        hourSeconds={84}
        minuteSeconds={16}
        hourDelay="-28s"
        minuteDelay="-2s"
      />
    </div>
  );
}
