export default function SectionDivider({ className = "bg-linen-50" }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center py-2 ${className}`}
    >
      <svg
        width="320"
        height="24"
        viewBox="0 0 320 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="12"
          x2="140"
          y2="12"
          stroke="#C9A96E"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="12"
          x2="320"
          y2="12"
          stroke="#C9A96E"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        {/* small botanical sprig */}
        <g
          transform="translate(160,12)"
          stroke="#C9A96E"
          strokeOpacity="0.7"
          strokeWidth="2.5"
          fill="none"
        >
          {/* centre diamond */}
          <path d="M0,-5 L3.5,0 L0,5 L-3.5,0 Z" />
          {/* left leaf */}
          <path d="M-3.5,0 Q-10,-4 -14,0 Q-10,4 -3.5,0 Z" />
          {/* right leaf */}
          <path d="M3.5,0 Q10,-4 14,0 Q10,4 3.5,0 Z" />
          {/* tiny stem ticks */}
          <line x1="-18" y1="0" x2="-14" y2="0" />
          <line x1="14" y1="0" x2="18" y2="0" />
        </g>
      </svg>
    </div>
  )
}
