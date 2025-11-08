import React from "react";
import { motion } from "framer-motion";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="border w-full p-0 text-zinc-200 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-8 p-6">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <motion.svg
            width="140"
            height="140"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
          >
            {/* body */}
            <motion.rect
              x="40"
              y="80"
              width="120"
              height="60"
              rx="10"
              fill="#d4d4d8"
              initial={{ y: 4 }}
              animate={{ y: [4, 0, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* lens */}
            <circle cx="170" cy="110" r="18" fill="#e5e7eb" />
            <circle cx="170" cy="110" r="10" fill="#9ca3af" />

            {/* reels */}
            <motion.g
              style={{ originX: 70, originY: 70 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <circle cx="70" cy="70" r="28" fill="#e5e7eb" />
              <circle cx="58" cy="66" r="4" fill="#9ca3af" />
              <circle cx="70" cy="55" r="4" fill="#9ca3af" />
              <circle cx="82" cy="66" r="4" fill="#9ca3af" />
            </motion.g>

            <motion.g
              style={{ originX: 115, originY: 60 }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <circle cx="115" cy="60" r="22" fill="#e5e7eb" />
              <circle cx="105" cy="58" r="3.5" fill="#9ca3af" />
              <circle cx="115" cy="48" r="3.5" fill="#9ca3af" />
              <circle cx="125" cy="58" r="3.5" fill="#9ca3af" />
            </motion.g>

            {/* viewfinder */}
            <rect x="30" y="88" width="16" height="12" rx="2" fill="#a1a1aa" />

            {/* tripod */}
            <line
              x1="70"
              y1="140"
              x2="45"
              y2="185"
              stroke="#e5e7eb"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="140"
              x2="125"
              y2="185"
              stroke="#e5e7eb"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="85"
              y1="140"
              x2="85"
              y2="188"
              stroke="#e5e7eb"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        {/* Loading text */}
        <div className="text-lg md:text-xl tracking-wide font-medium">
          {message}
          <span
            className="ml-2 inline-block h-2 w-2 rounded-full bg-zinc-300 align-middle animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="ml-1 inline-block h-2 w-2 rounded-full bg-zinc-300 align-middle animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="ml-1 inline-block h-2 w-2 rounded-full bg-zinc-300 align-middle animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>

        {/* Helper text */}
        <p className="text-xs text-zinc-400/80">
          Preparing awesome movies for you…
        </p>
      </div>
    </div>
  );
};

export default Loading;
