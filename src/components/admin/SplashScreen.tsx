import React, { useEffect, useState } from "react";

export default function SplashScreen({
  messages = ["Loading..."],
  duration = 1500,
}: {
  messages?: string[];
  duration?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const [logoRotateClass, setLogoRotateClass] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setLogoRotateClass("animate-spin");
      setTimeout(() => {
        setFadeClass("opacity-0");
      }, 400);
      setTimeout(() => {
        setLogoRotateClass("");
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 700);
      setTimeout(() => {
        setFadeClass("opacity-100");
      }, 900);
    }, duration);

    return () => clearInterval(interval);
  }, [messages, duration]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-200 via-blue-200 to-purple-200 dark:from-emerald-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-1000 px-4 sm:px-6 lg:px-8
      ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative flex flex-col items-center gap-6 sm:gap-8 z-10 w-full max-w-sm sm:max-w-md">
        {/* Main logo container */}
        <div className="relative">
          {/* Rotating ring */}
          <div
            className="absolute -inset-2 sm:-inset-3 lg:-inset-4 w-32 h-32 sm:w-38 sm:h-38 lg:w-44 lg:h-44 
            rounded-full border-3 sm:border-4 lg:border-[5px]
            border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
            animate-spin opacity-75"
            style={{
              background:
                "conic-gradient(from 0deg, #60a5fa, #a855f7, #f472b6, #60a5fa)",
              borderRadius: "50%",
              animation: "spin 3s linear infinite",
            }}
          ></div>

          {/* Inner rotating ring */}
          <div
            className="absolute -inset-1 sm:-inset-1.5 lg:-inset-2 w-30 h-30 sm:w-35 sm:h-35 lg:w-40 lg:h-40 
            rounded-full border-2 sm:border-3 lg:border-3
            border-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 
            animate-spin opacity-50"
            style={{
              background:
                "conic-gradient(from 180deg, #f472b6, #60a5fa, #a855f7, #f472b6)",
              borderRadius: "50%",
              animation: "spin 4s linear infinite reverse",
            }}
          ></div>

          {/* Pulsing ring */}
          <div
            className="absolute -inset-1 sm:-inset-1.5 lg:-inset-2 w-30 h-30 sm:w-35 sm:h-35 lg:w-40 lg:h-40 
            rounded-full border-2 border-slate-300/50 dark:border-white/30 animate-ping opacity-40"
          ></div>

          {/* Logo container */}
          <div className="relative flex items-center justify-center transition-all duration-300">
            {/* Logo placeholder */}
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-xl rotate-45 
              bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 
              flex items-center justify-center shadow-lg ${logoRotateClass}`}
            ></div>
            <img
              src="/Web-logo.png"
              alt="Logo"
              className="absolute w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
              style={{ pointerEvents: "none" }}
              draggable={false}
            />
          </div>
        </div>

        {/* Animated text */}
        <div className="text-center w-full mt-8 sm:mt-12 pb-4">
          <h1
            className={`text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 
            dark:from-white dark:via-blue-100 dark:to-purple-100 
            bg-clip-text text-transparent transition-all duration-600 
            leading-tight sm:leading-tight lg:leading-tight xl:leading-tight
            tracking-wide ${fadeClass}`}
            style={{
              lineHeight: "1.1",
              paddingBottom: "0.25rem",
            }}
          >
            {messages[currentMessageIndex]}
          </h1>
        </div>

        {/* Enhanced loading dots */}
        <div className="flex space-x-2 sm:space-x-3 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 
                bg-white/60 dark:bg-white/60 rounded-full animate-bounce shadow-lg"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.5s",
                boxShadow: "0 0 15px rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom branding area */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 text-center px-4">
        <p className="text-xs text-slate-500 dark:text-white/40 tracking-wide">
          © 2025 Tugus Arta. All rights reserved.
        </p>
      </div>
    </div>
  );
}
