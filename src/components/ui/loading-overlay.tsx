"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoadingOverlayProps {
  isVisible: boolean;
  type: "login" | "logout";
  message?: string;
  onComplete?: () => void;
}

export default function LoadingOverlay({
  isVisible,
  type,
  message,
  onComplete,
}: LoadingOverlayProps) {
  const router = useRouter();
  const [stage, setStage] = useState<"loading" | "success">("loading");
  const [progress, setProgress] = useState(0);
  const [textAnimationIndex, setTextAnimationIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setStage("loading");
      setProgress(0);
      setTextAnimationIndex(0);

      // Text animation cycle
      const textInterval = setInterval(() => {
        setTextAnimationIndex((prev) => (prev + 1) % 3);
      }, 800);

      // Smooth progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 12 + 8;
        });
      }, 200);

      // Show success after loading completes
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setStage("success");

          // Hanya panggil onComplete, redirect dihandle parent
          setTimeout(() => {
            onComplete?.();
          }, 1500);
        }, 300);
      }, 2500);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
        clearInterval(textInterval);
      };
    }
  }, [isVisible, onComplete, router, type]);

  if (!isVisible) return null;

  const getContent = () => {
    switch (type) {
      case "login":
        return {
          title: stage === "success" ? "Login Berhasil!" : "Memverifikasi",
          subtitle:
            stage === "success"
              ? "Mengarahkan ke dashboard..."
              : "Sedang memproses kredensial Anda",
          color: "from-blue-500 to-indigo-600",
          bgColor: "from-blue-50 to-indigo-100",
          accentColor: "from-blue-400 via-purple-500 to-indigo-600",
        };
      case "logout":
        return {
          title: stage === "success" ? "Logout Berhasil!" : "Mengakhiri Sesi",
          subtitle:
            stage === "success"
              ? "Mengarahkan ke halaman login..."
              : "Menyimpan dan membersihkan data",
          color: "from-slate-500 to-slate-700",
          bgColor: "from-slate-50 to-slate-100",
          accentColor: "from-slate-400 via-gray-500 to-slate-700",
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center overflow-hidden">
      {/* Main content card */}
      <div
        className={`relative bg-gradient-to-br ${
          content.bgColor
        } dark:from-slate-800/90 dark:to-slate-900/90 
        rounded-3xl shadow-2xl p-10 max-w-md mx-4 text-center 
        transform transition-all duration-700 ease-out
        ${stage === "success" ? "scale-105 rotate-1" : "scale-100"}
        border border-white/30 dark:border-slate-700/50
        backdrop-blur-sm`}
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-bl from-white/40 to-transparent rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-tr from-white/40 to-transparent rounded-full"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-tl from-white/40 to-transparent rounded-full"></div>

        {/* Enhanced icon with multiple animation layers */}
        <div
          className={`relative mx-auto w-20 h-20 rounded-2xl 
          bg-gradient-to-r ${content.accentColor} 
          flex items-center justify-center mb-8
          transition-all duration-700 ease-out
          ${stage === "success" ? "scale-110 rotate-12" : "scale-100"}
          shadow-2xl shadow-blue-500/25`}
        >
          {/* Outer rotating ring */}
          <div className="absolute -inset-1 border-4 border-white/30 border-t-white rounded-2xl animate-spin"></div>

          {/* Pulsing glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl animate-pulse blur-sm"></div>

          {stage === "loading" ? (
            <>
              {/* Animated SVG Icon */}
              {type === "login" ? (
                <svg
                  className="w-10 h-10 text-white relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="1.5"
                    fill="currentColor"
                    className="animate-ping"
                  />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-white relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
            </>
          ) : (
            <svg
              className="w-10 h-10 text-white animate-bounce relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}

          {/* Success celebration particles */}
          {stage === "success" && (
            <>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                  style={{
                    left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 40}%`,
                    top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 40}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Enhanced text content with dynamic typography */}
        <div className="space-y-4 mb-8">
          {/* Main title with gradient text and animation */}
          <div className="relative overflow-hidden">
            <h3
              className={`text-2xl font-black tracking-wide transition-all duration-700
              bg-gradient-to-r ${
                stage === "success"
                  ? "from-green-500 via-emerald-500 to-green-600"
                  : content.accentColor
              }
              bg-clip-text text-transparent
              ${stage === "success" ? "animate-pulse" : ""}
              transform transition-transform duration-500
              ${
                textAnimationIndex === 0
                  ? "translate-y-0"
                  : textAnimationIndex === 1
                  ? "-translate-y-1 scale-105"
                  : "translate-y-0 scale-95"
              }`}
            >
              {content.title}
              {stage === "loading" && (
                <span className="inline-flex ml-1">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-1 h-1 bg-current rounded-full mx-0.5 animate-bounce`}
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </span>
              )}
            </h3>
          </div>

          {/* Subtitle with typewriter effect */}
          <div className="relative h-12 flex items-center justify-center">
            <p className="text-base font-medium text-gray-700 dark:text-gray-200 leading-relaxed max-w-xs">
              <span
                className={`transition-all duration-500 ${
                  textAnimationIndex % 2 === 0 ? "opacity-100" : "opacity-75"
                }`}
              >
                {message || content.subtitle}
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced progress bar with gradient and glow */}
        <div className="relative w-full bg-white/30 dark:bg-slate-700/50 rounded-full h-2 mb-6 overflow-hidden">
          {/* Background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

          <div
            className={`h-full bg-gradient-to-r ${
              stage === "success"
                ? "from-green-400 via-emerald-500 to-green-600"
                : content.accentColor
            } 
              rounded-full transition-all duration-500 ease-out relative overflow-hidden
              shadow-lg ${
                stage === "success"
                  ? "shadow-green-500/50"
                  : "shadow-blue-500/30"
              }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Progress bar shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide"></div>
          </div>
        </div>

        {/* Enhanced loading indicators */}
        {stage === "loading" && (
          <div className="flex justify-center items-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative">
                <div
                  className={`w-3 h-3 bg-gradient-to-r ${content.accentColor} rounded-full animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "1.2s",
                  }}
                />
                <div
                  className={`absolute inset-0 w-3 h-3 bg-gradient-to-r ${content.accentColor} rounded-full animate-ping opacity-30`}
                  style={{
                    animationDelay: `${i * 0.3 + 0.5}s`,
                    animationDuration: "2s",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}
