
import Link from "next/link";
import { ChefHat, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-orange-100 via-rose-50 to-amber-100">
      <div className="absolute top-10 left-10 w-80 h-80 bg-orange-400/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-400/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg text-center">
        
        <svg
          viewBox="0 0 240 200"
          className="w-64 h-56 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="plateGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          
          <ellipse
            cx="120"
            cy="150"
            rx="80"
            ry="14"
            fill="#fed7aa"
            opacity="0.5"
          />
          <circle
            cx="120"
            cy="120"
            r="70"
            fill="white"
            stroke="#fdba74"
            strokeWidth="3"
          />
          <circle
            cx="120"
            cy="120"
            r="52"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="2"
          />

       
          <g transform="translate(60,70) rotate(-20)">
            <rect x="0" y="0" width="6" height="60" rx="3" fill="#9ca3af" />
            <rect x="-6" y="-14" width="4" height="18" rx="2" fill="#9ca3af" />
            <rect x="0" y="-14" width="4" height="18" rx="2" fill="#9ca3af" />
            <rect x="6" y="-14" width="4" height="18" rx="2" fill="#9ca3af" />
          </g>

          
          <g transform="translate(180,70) rotate(20)">
            <rect x="-3" y="0" width="6" height="55" rx="3" fill="#9ca3af" />
            <ellipse cx="0" cy="-8" rx="10" ry="14" fill="#9ca3af" />
          </g>

          <text
            x="120"
            y="128"
            textAnchor="middle"
            fontSize="34"
            fontWeight="bold"
            fill="url(#plateGradient)"
            fontFamily="sans-serif"
          >
            404
          </text>

          <path
            d="M100 55 Q95 45 100 38 Q105 30 100 22"
            stroke="#fdba74"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M120 55 Q115 45 120 38 Q125 30 120 22"
            stroke="#fdba74"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M140 55 Q135 45 140 38 Q145 30 140 22"
            stroke="#fdba74"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>

        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-orange-600 border border-orange-100 mb-4">
          <ChefHat className="w-4 h-4" />
          Oops, kitchens empty here
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          This page could not be found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or was never here
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-xl hover:shadow-orange-200 transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
