const systemNodes = [
  { label: "SIGNAL ENGINE", className: "top-[18%] left-[10%]" },
  { label: "RISK LOGIC", className: "top-[43%] right-[8%]" },
  { label: "EXECUTION", className: "bottom-[18%] left-[16%]" },
] as const;

const systemTracePoints = [
  "M28 178 C76 128 112 148 158 98",
  "M158 98 C204 48 252 78 298 34",
  "M158 98 C216 136 244 154 312 122",
  "M74 246 C132 210 170 226 218 188",
  "M218 188 C266 150 298 166 348 112",
] as const;

export function HeroSystemVisual() {
  return (
    <div
      aria-hidden="true"
      className="surface-data relative min-h-[320px] overflow-hidden rounded-xl md:min-h-[380px] xl:min-h-[460px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(0,168,107,0.16),transparent_28%),radial-gradient(circle_at_78%_70%,rgba(212,175,55,0.12),transparent_32%)]" />
      <div className="absolute inset-6 rounded-lg border border-[rgba(255,255,255,0.06)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 420 320"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="heroTrace" x1="28" x2="348" y1="178" y2="112">
            <stop offset="0%" stopColor="rgba(0,168,107,0.18)" />
            <stop offset="54%" stopColor="rgba(35,209,96,0.68)" />
            <stop offset="100%" stopColor="rgba(244,201,93,0.64)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
          <path d="M40 50 H380" />
          <path d="M40 112 H380" />
          <path d="M40 174 H380" />
          <path d="M40 236 H380" />
          <path d="M96 30 V286" />
          <path d="M180 30 V286" />
          <path d="M264 30 V286" />
          <path d="M348 30 V286" />
        </g>
        <g fill="none" stroke="url(#heroTrace)" strokeLinecap="round">
          {systemTracePoints.map((point) => (
            <path key={point} d={point} strokeWidth="2" />
          ))}
        </g>
        <g>
          {[
            [158, 98],
            [298, 34],
            [312, 122],
            [218, 188],
            [74, 246],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="4"
              fill="var(--background)"
              stroke="var(--emerald-bright)"
              strokeWidth="2"
            />
          ))}
        </g>
      </svg>

      <div className="absolute top-6 right-6 left-6 flex items-center justify-between gap-4">
        <div className="text-gold-warm text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
          System Schematic
        </div>
        <div className="text-subtle-foreground text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
          Forward Test
        </div>
      </div>

      {systemNodes.map((node) => (
        <div
          key={node.label}
          className={`bg-surface-elevated/90 text-foreground absolute rounded-md border border-[rgba(255,255,255,0.12)] px-3 py-2 text-[0.68rem] font-semibold tracking-[0.12em] uppercase shadow-[var(--shadow-soft)] ${node.className}`}
        >
          {node.label}
        </div>
      ))}

      <div className="absolute right-6 bottom-6 left-6 grid gap-2 border-t border-[rgba(255,255,255,0.08)] pt-4 sm:grid-cols-3">
        {["Model Rules", "Signal Quality", "Execution Path"].map((item) => (
          <div
            key={item}
            className="text-muted-foreground flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.08em] uppercase"
          >
            <span className="bg-emerald-bright size-1.5 rounded-full" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
