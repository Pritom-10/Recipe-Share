
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
      <path
        d="M24 12c-3.3 0-6 2.7-6 6 0 1.5.6 2.9 1.5 3.9-2.1 1-3.5 3.1-3.5 5.6v1.5h16v-1.5c0-2.5-1.4-4.6-3.5-5.6.9-1 1.5-2.4 1.5-3.9 0-3.3-2.7-6-6-6z"
        fill="white"
      />
      <rect x="21" y="30" width="6" height="6" rx="1" fill="white" />
      <circle cx="24" cy="17" r="1.6" fill="url(#logoGradient)" />
    </svg>
  );
};

export default Logo;
