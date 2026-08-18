const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGradient)" />
      {/* Chef Hat */}
      <g>
        {/* Puffy top */}
        <circle cx="18" cy="20" r="6.5" fill="white" />
        <circle cx="24" cy="16" r="8" fill="white" />
        <circle cx="30" cy="20" r="6.5" fill="white" />
        {/* Band */}
        <rect x="15" y="25" width="18" height="8" rx="3" fill="white" />
        {/* Small heart accent on band */}
        <path
          d="M24 28.5c-1.8-1.5-3-2.8-3-3.8 0-.8.7-1.5 1.5-1.5.5 0 1.2.3 1.5 1 .3-.7 1-1 1.5-1 .8 0 1.5.7 1.5 1.5 0 1-1.2 2.3-3 3.8z"
          fill="url(#logoGradient)"
          stroke="white"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
};

export default Logo;
